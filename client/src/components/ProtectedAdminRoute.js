import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedAdminRoute({ component: Component, ...restOfProps }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        userInfo && userInfo.isAdmin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedAdminRoute;