import React from "react";
import Section from "../Layout2/Section";
import MetaTags from "react-meta-tags";

const Layout2 = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Bidderbadger</title>
      </MetaTags>
      <Section />
    </React.Fragment>
  );
};
export default Layout2;
