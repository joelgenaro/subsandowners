import React, { Suspense } from "react";
import { publicRoutes, authRoutes, privateRoutes } from "./allRoutes";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";

/* Layout */
import CommonLayout from "../Layout/CommonLayout/index";
import AuthLayout from "../Layout/AuthLayout";
import PrivateRoute from "./ProtectedRoute";

const Index = () => {
  const availableAuthRoutesPath = authRoutes.map((r) => r["path"]);
  const availablePublicRoutesPaths = publicRoutes.map((r) => r["path"]);

  const Loader = () => {
    return (
      <div id="preloader">
        <div id="status">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={Loader()}>
          <Switch>
            <Route path={availableAuthRoutesPath}>
              <AuthLayout>
                {authRoutes.map((route, idx) => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={idx}
                    exact={true}
                  />
                ))}
              </AuthLayout>
            </Route>

            <Route path={availablePublicRoutesPaths}>
              <CommonLayout>
                {publicRoutes.map((route, idx) => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={idx}
                    exact={true}
                  />
                ))}
              </CommonLayout>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default Index;
