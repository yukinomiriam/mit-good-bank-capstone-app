import React, { useEffect } from "react";
import Card from "../Card";
import AccountBalanceForm from "./AccountBalanceForm";

//import { UserContext } from "../../context";
import AuthService from "../../services/auth.service";
function Deposit() {
  //const ctx = React.useContext(UserContext);
  let currentUser = AuthService.getCurrentUser();
  let balance = !currentUser
    ? 0
    : currentUser.balance !== ""
    ? currentUser.balance
    : 0;
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [total, setTotal] = React.useState(balance);
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  const validateDeposit = (event) => {
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

    setValidTransaction(true);
    setAmount(Number(amt));
  };

  useEffect(() => {
    //console.log(`Called useEffect Deposit`);
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
    let newTotal = total + amount;
    setTotal(newTotal);
    setValidTransaction(false);
    updateUserBalance(newTotal);
    setIsSuccess(true);
    setStatus("Success: Your deposit has been completed");
    event.preventDefault();
    //TODO implement logic to update balance
  };

  /* function that updates the total balance*/
  function updateUserBalance(newTotal) {
    //ctx.users[0].balance = newTotal;
    //TODO
  }

  const accountDepositComponent = (
    <AccountBalanceForm
      label="Deposit"
      total={total}
      validateTransaction={validateDeposit}
      handleSubmit={handleSubmit}
      validTransaction={validTransaction}
    />
  );
  return (
    <>
      <Card
        header="Deposit"
        className="card brand-centered brand-margin-top"
        maxWidth="40rem"
        status={status}
        successFlag={isSuccess}
        body={accountDepositComponent}
      />
    </>
  );
}

export default Deposit;
