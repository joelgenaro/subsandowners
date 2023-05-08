import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row } from "reactstrap";
import Content from "./Content";
import Section from "./Section";
import "./index.css";

const JobPost = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Post a job | Bidderbadger</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <Content />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default JobPost;
