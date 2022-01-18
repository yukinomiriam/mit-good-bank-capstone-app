import React from "react";
import { Redirect, Route } from "react-router-dom";

import { UserContext } from "../../context";
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const ctx = React.useContext(UserContext);
  const isAuthenticated = ctx.users[0].isisLogged;
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/Login/" />
      }
    />
  );
}

export default ProtectedRoute;
