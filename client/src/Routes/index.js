import React, { Suspense } from "react";
import { authRoutes, subcontractorRoutes, ownerRoutes } from "./allRoutes";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

/* Layout */
import CommonLayout from "../Layout/CommonLayout/index";
import OwnerLayout from "../Layout/OwnerLayout/index";
import AuthLayout from "../Layout/AuthLayout";

const Index = () => {
  const availableAuthRoutesPath = authRoutes.map((r) => r["path"]);
  const availableOwnerRoutesPath = ownerRoutes.map((r) => r["path"]);
  const availableSubcontractorRoutesPath = subcontractorRoutes.map(
    (r) => r["path"]
  );

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

            <Route path={availableOwnerRoutesPath}>
              <OwnerLayout>
                {ownerRoutes.map((route, idx) => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={idx}
                    exact={true}
                  />
                ))}
              </OwnerLayout>
            </Route>

            <Route path={availableSubcontractorRoutesPath}>
              <CommonLayout>
                {subcontractorRoutes.map((route, idx) => (
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
