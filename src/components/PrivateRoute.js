//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in

import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          // render component
          return <Component {...props}/>;
        } else {
          // route to login
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default PrivateRoute;