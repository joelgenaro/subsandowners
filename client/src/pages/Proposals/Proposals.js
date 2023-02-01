import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import JobListing from "./JobListing";
import Section from "./Section";
import Selected from "./Selected";
import "./index.css";

const Proposals = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Proposals</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Selected />
          <JobListing />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Proposals;
