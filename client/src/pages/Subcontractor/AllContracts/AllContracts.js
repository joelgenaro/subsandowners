import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Card } from "reactstrap";
import Contracts from "./Contracts";
import Section from "./Section";
import Search from "./Search";
import "./index.css";

const AllContracts = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>My Jobs</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Card className="mt-4" id="tabs">
            <Search />
            <Contracts />
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AllContracts;
