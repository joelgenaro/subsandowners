import React, { Suspense } from "react";
import { publicRoutes, authRoutes } from "./allRoutes";
// import PrivateRoute from "./ProtectedRoute";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

/* Layout */
import CommonLayout from "../Layout/CommonLayout/index";
import AuthLayout from "../Layout/AuthLayout";

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
                    exact={true}
                    path={route.path}
                    component={route.component}
                    key={idx}
                  />
                ))}
              </AuthLayout>
            </Route>

            <Route path={availablePublicRoutesPaths}>
              <CommonLayout>
                {publicRoutes.map((route, idx) => (
                  <Route
                    exact={true}
                    path={route.path}
                    component={route.component}
                    key={idx}
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
