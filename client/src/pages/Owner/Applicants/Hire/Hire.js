import React from "react";
import { Col, Row } from "reactstrap";
import CandidateDetails from "./CandidateDetails";
import Filters from "./Filters";
import { useSelector } from "react-redux";

const Hire = () => {
  const { isLoading, hiredCandidates } = useSelector(
    (state) => state.applicants
  );

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          {/* <Filters /> */}
          <div className="candidate-list">
            {!isLoading ? (
              hiredCandidates.data.length ? (
                hiredCandidates.data.map((candidate, key) => (
                  <CandidateDetails key={key} details={candidate} />
                ))
              ) : (
                <Row className="justify-content-center">No hires</Row>
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

export default Hire;
