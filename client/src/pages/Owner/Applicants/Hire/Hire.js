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
          <Filters />
          <div className="candidate-list">
            {!isLoading ? (
              hiredCandidates.data ? (
                hiredCandidates.data.map((candidate, key) => (
                  <CandidateDetails key={key} details={candidate} />
                ))
              ) : (
                "No results matched your search"
              )
            ) : (
              <div
                className="spinner-border text-primary m-1"
                role="status"
              ></div>
            )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Hire;
