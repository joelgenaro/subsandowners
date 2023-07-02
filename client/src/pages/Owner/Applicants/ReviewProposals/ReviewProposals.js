import React from "react";
import { Col, Row } from "reactstrap";
import CandidateDetails from "./CandidateDetails";
import Filters from "./Filters";
import { useSelector } from "react-redux";

const ReviewProposals = () => {
  const { isLoading, reviewProposals, jobDetails } = useSelector(
    (state) => state.applicants
  );

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          {/* <Filters /> */}
          <div className="candidate-list">
            {!isLoading ? (
              reviewProposals.data.length && jobDetails ? (
                reviewProposals.data.map((proposal, key) => (
                  <CandidateDetails
                    key={key}
                    jobDetails={jobDetails}
                    details={proposal}
                  />
                ))
              ) : (
                <Row className="justify-content-center">No proposals</Row>
              )
            ) : (
              <Row className="justify-content-center">
                <div
                  className="spinner-border text-primary m-1"
                  role="status"
                ></div>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ReviewProposals;
