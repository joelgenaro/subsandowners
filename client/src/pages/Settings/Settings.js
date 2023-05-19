import React, { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import Content from "./Content";
import Section from "./Section";
import "./index.css";

const Settings = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Bidderbadger</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Content />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Settings;
