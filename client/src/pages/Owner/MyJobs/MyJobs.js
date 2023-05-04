import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import Contracts from "./Contracts";
import Section from "./Section";
import "./index.css";

const MyJobs = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>My Jobs</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Contracts />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default MyJobs;
