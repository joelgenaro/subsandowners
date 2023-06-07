import React, { Suspense } from "react";
import {
  authLayoutForPublicRoutes,
  authLayoutForPrivateRoutes,
  commonLayoutForPublicRoutes,
  commonLayoutForPrivateRoutes,
} from "./allRoutes";
import PrivateRoute from "./ProtectedRoute";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

/* Layout */
import CommonLayout from "../Layout/CommonLayout/index";
import AuthLayout from "../Layout/AuthLayout";

const Index = () => {
  const availableAuthLayoutForPublicRoutes = authLayoutForPublicRoutes.map(
    (r) => r["path"]
  );
  const availableAuthLayoutForPrivateRoutes = authLayoutForPrivateRoutes.map(
    (r) => r["path"]
  );
  const availableCommonLayoutForPublicRoutes = commonLayoutForPublicRoutes.map(
    (r) => r["path"]
  );
  const availableCommonLayoutForPrivateRoutes =
    commonLayoutForPrivateRoutes.map((r) => r["path"]);

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
            <Route path={availableAuthLayoutForPublicRoutes}>
              <AuthLayout>
                {authLayoutForPublicRoutes.map((route, idx) => (
                  <Route
                    exact={true}
                    path={route.path}
                    component={route.component}
                    key={idx}
                  />
                ))}
              </AuthLayout>
            </Route>

            <PrivateRoute path={availableAuthLayoutForPrivateRoutes}>
              <AuthLayout>
                {authLayoutForPrivateRoutes.map((route, idx) => (
                  <Route
                    exact={true}
                    path={route.path}
                    component={route.component}
                    key={idx}
                  />
                ))}
              </AuthLayout>
            </PrivateRoute>

            <PrivateRoute path={availableCommonLayoutForPrivateRoutes}>
              <CommonLayout>
                {commonLayoutForPrivateRoutes.map((route, idx) => (
                  <Route
                    exact={true}
                    path={route.path}
                    component={route.component}
                    key={idx}
                  />
                ))}
              </CommonLayout>
            </PrivateRoute>

            <Route path={availableCommonLayoutForPublicRoutes}>
              <CommonLayout>
                {commonLayoutForPublicRoutes.map((route, idx) => (
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
