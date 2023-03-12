import React from "react";
import { Col, Container, Row } from "reactstrap";
import CandidateList from "./CandidateList";
import TextSearch from "./TextSearch";
import Section from "./Section";
import Pagination from "./Pagination";
import MetaTags from "react-meta-tags";
import "./index.css";

const Candidate = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Saved Talents</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <TextSearch />
          <Row>
            <Col lg={12}>
              <CandidateList />
            </Col>
          </Row>
          <Pagination />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Candidate;
