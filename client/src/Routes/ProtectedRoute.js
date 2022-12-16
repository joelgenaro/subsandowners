import React from "react";
import { useCookies } from "react-cookie";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <Route
      {...rest}
      render={() => {
        return cookies.token ? children : <Redirect to="/signin" />;
      }}
    />
  );
}

export default PrivateRoute;
