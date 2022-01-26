import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { useDispatch } from "react-redux";

const Welcome = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
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
  }, [currentUser, dispatch]);

  return (
    <>
      {isLoggedIn ? (
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
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Welcome;
