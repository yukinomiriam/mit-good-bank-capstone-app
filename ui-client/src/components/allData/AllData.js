import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Card";
import RowTable from "./RowTable";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

function AllData() {
  const [usersList, setUsersList] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    //fetch all accounts
    if (currentUser) {
      UserService.getAllUsers(currentUser.id).then(
        (response) => {
          console.log("...UserService.getAllUsers...");
          console.log(response.data.users);
          setUsersList(response.data.users);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.error("error: " + resMessage);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );
    }
  }, []);

  return (
    <>
      {currentUser ? (
        <Card
          header="All Data"
          className="card brand-centered brand-margin-top"
          maxWidth="40rem"
          body={
            <>
              <table className="brand-table">
                <thead>
                  <tr>
                    <th className="brand-table-th-small">Acct #</th>
                    <th className="brand-table-th-small">Name</th>
                    <th className="brand-table-th-small">Email</th>
                    <th className="brand-table-th-small">Roles</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user, i) => (
                    <RowTable data={user} key={i} />
                  ))}
                </tbody>
              </table>
            </>
          }
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default AllData;
