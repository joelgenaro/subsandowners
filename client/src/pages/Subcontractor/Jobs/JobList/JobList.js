import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import Section from "../../Jobs/JobList/Section";
import JobVacancyList from "./JobVacancyList";
import TextSearch from "./TextSearch";
import Pagination from "./Pagination";
import FilterOptions from "./FilterOptions";
import "./index.css";

const JobList = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Browse Jobs</title>
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

export default JobList;
