import React from "react";
import Home from "../Home";
import Section from "../Layout2/Section";
import MetaTags from "react-meta-tags";

const Layout2 = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Scheduleasub</title>
      </MetaTags>
      <Section />
      <Home />
    </React.Fragment>
  );
};
export default Layout2;
