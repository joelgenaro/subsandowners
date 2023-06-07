import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import Section from "./Section";
import JobVacancyList from "./JobVacancyList";
import TextSearch from "./TextSearch";
import Pagination from "./Pagination";
import FilterOptions from "./FilterOptions";
import "./index.css";

const SavedJobs = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Saved Jobs</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="me-lg-5">
                <TextSearch />
                <JobVacancyList />
              </div>
            </Col>
            <FilterOptions />
          </Row>
          <Pagination />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default SavedJobs;
