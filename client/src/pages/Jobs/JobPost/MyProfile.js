import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row } from "reactstrap";
import RightSideContent from "./RightSideContent";
import Section from "./Section";
import "./index.css";

const MyProfile = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>My Profile | Jobcy - Job Listing Template | Themesdesign</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <RightSideContent />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default MyProfile;
