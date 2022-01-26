import React, { useState, useEffect, useLayoutEffect } from "react";
import Card from "../Card";
import AccountBalanceForm from "./AccountBalanceForm";
import EventBus from "../../common/EventBus";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UserService from "../../services/user.service";

function Withdraw(props) {
  const [validTransaction, setValidTransaction] = useState(false);
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(0);

  useLayoutEffect(() => {
    if (currentUser) {
      UserService.getUserBalance(currentUser.id).then(
        (response) => {
          console.log("balance: " + response.data.balance);
          setBalance(response.data.balance);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("error: " + resMessage);
          //setStatus(resMessage);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }
  }, [currentUser]);

  const validateWithdraw = (event) => {
    let amt = event.target.value;
    //console.log("event: " + amt);
    if (amt !== "" && (Number(amt) <= 0 || amt === "-")) {
      setStatus("Error: Invalid amount");
      setIsSuccess(false);
      return setValidTransaction(false);
    }

    if (amt !== "" && amt !== "-" && !Number(amt)) {
      setStatus("Error: Please introduce numbers only");
      setIsSuccess(false);
      return setValidTransaction(false);
    }

    if (amt === "") {
      return setValidTransaction(false);
    }

    //setStatus("");
    setValidTransaction(true);
    setAmount(Number(amt));
  };

  useEffect(() => {
    //(`Called useEffect Withdraw`);
    let isMounted = true;
    if (status !== "") {
      //console.log(`Called useEffect`);
      setTimeout(() => {
        if (isMounted) setStatus("");
      }, 3000);
    }

    return () => (isMounted = false);
  });

  const handleSubmit = (event) => {
    /*let newTotal = total - amount;
    if (amount > total) {
      let newTotal = total;
      setStatus(
        `Error: You cannot withdraw more than ${newTotal.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        )}`
      );
      setIsSuccess(false);
      return setValidTransaction(false);
    }

    setTotal(newTotal);
    setValidTransaction(false);
    updateUserBalance(newTotal);
    setIsSuccess(true);
    setStatus("Success: Your withdrawal has been completed");
    event.preventDefault();*/
  };

  /* function that updates the total balance*/
  function updateUserBalance(newTotal) {
    // ctx.users[0].balance = newTotal;
  }

  const accountWithdrawComponent = (
    <AccountBalanceForm
      label="Withdraw"
      total={balance}
      validateTransaction={validateWithdraw}
      handleSubmit={handleSubmit}
      validTransaction={validTransaction}
    />
  );

  return (
    <>
      {isLoggedIn ? (
        <Card
          header="Withdraw"
          className="card brand-centered brand-margin-top"
          maxWidth="40rem"
          status={status}
          successFlag={isSuccess}
          body={accountWithdrawComponent}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Withdraw;
