import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import JobListing from "./JobListing";
import Section from "./Section";
import Search from "./Search";
import Pagination from "./Pagination";
import "./index.css";

const ManageJobs = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Job postings - All jobs</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Search />
          <JobListing />
          <Pagination />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default ManageJobs;
