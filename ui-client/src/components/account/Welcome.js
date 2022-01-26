import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card";
import UserService from "../../services/user.service";

const Welcome = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
  }, [currentUser]);

  useEffect(() => {
    UserService.getUserBalance(currentUser.id).then(
      (response) => {
        console.log("balance: " + response.data.balance);
        let currentBalance = response.data.balance;
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
      }
    );
  }, [currentUser.id]);

  return (
    <Card
      header="Welcome!!"
      className="card brand-centered brand-margin-top"
      maxWidth="40rem"
      body={
        <>
          <div className="container">
            <div className="row">
              <div className="col">
                <h4>
                  Welcome {currentUser.firstName} {currentUser.lastName}
                </h4>
              </div>
            </div>
            <p>
              <strong>Id:</strong> {currentUser.id}{" "}
            </p>
            <p>
              <strong>Token:</strong> {currentUser.accessToken}{" "}
            </p>
            <p>
              <strong>Balance:</strong> ${balance}
            </p>
          </div>
        </>
      }
    />
  );
};

export default Welcome;
