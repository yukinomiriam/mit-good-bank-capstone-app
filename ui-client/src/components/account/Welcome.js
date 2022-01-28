import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(0);
  const [transList, setTransList] = useState([]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (currentUser) {
      UserService.getUserTrans(currentUser.id).then(
        (response) => {
          console.log("transactions: " + response.data.transactions);
          setTransList(response.data.transactions);
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
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Card
          header="Welcome"
          className="card brand-centered brand-margin-top"
          maxWidth="60rem"
          body={
            <>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h4>
                      {currentUser.firstName} {currentUser.lastName}
                    </h4>
                  </div>
                  <div className="col"></div>
                  <div className="col">
                    <h5>
                      Account Balance:{" "}
                      <CurrencyFormat
                        value={balance.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <br />
                </div>
              </div>
              <br />
              <div className="container">
                <div className="row">
                  <h6>
                    <FontAwesomeIcon icon={solid.faReceipt} size="lg" /> Recent
                    Transactions
                  </h6>
                </div>

                <table className="brand-table">
                  <thead>
                    <tr>
                      <th className="brand-table-th">Tans Number</th>
                      <th className="brand-table-th">Trans Type</th>
                      <th className="brand-table-th">Amount</th>
                      <th className="brand-table-th">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transList.map((transaction, i) => (
                      <tr>
                        <td className="brand-table-td">
                          {transaction.tranNumber}
                        </td>
                        <td className="brand-table-td">
                          {transaction.tranType}
                        </td>
                        <td className="brand-table-td">
                          {
                            <CurrencyFormat
                              value={transaction.amount.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          }
                        </td>
                        <td className="brand-table-td">
                          {transaction.createdDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          }
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Welcome;
