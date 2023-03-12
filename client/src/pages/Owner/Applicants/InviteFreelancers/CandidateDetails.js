import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";

const CandidateDetails = ({ candidateDetailsNew }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    candidateDetailsNew.description.length > 300
      ? setIsMore(true)
      : setIsMore(false);
  }, [candidateDetailsNew.description.length]);

  // more and less
  const description = showFullDescription
    ? candidateDetailsNew.description
    : candidateDetailsNew.description.slice(0, 300) + (isMore ? "..." : "");

  const showHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setShowFullDescription(!showFullDescription);
  };

  return (
    <React.Fragment>
      <div className="candidate-list-box card mt-4">
        <CardBody className="p-4">
          <Row className="">
            <Col lg={2}>
              <div className="candidate-list-images">
                <Link to="#">
                  <img
                    src={candidateDetailsNew.userImg}
                    alt=""
                    className="avatar-lg img-thumbnail rounded-circle"
                  />
                </Link>
              </div>
            </Col>

            <Col lg={10}>
              <Row className="">
                <Col lg={6}>
                  <div className="candidate-list-content mt-3 mt-lg-0">
                    <h5 className="fs-19 mb-0">
                      <Link to="/candidatedetails" className="primary-link">
                        {candidateDetailsNew.candidateName}
                      </Link>
                    </h5>
                    <p className="text-muted mb-2">
                      <i className="mdi mdi-map-marker"></i>{" "}
                      {candidateDetailsNew.candidateDesignation}
                    </p>
                    <ul className="list-inline mb-0 text-muted">
                      <li className="list-inline-item">
                        $ {candidateDetailsNew.salary} earned
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="proposalBtn">
                    <Link to="#" className="btn btn-outline-primary">
                      Hire
                    </Link>
                    <Link to="#" className="btn btn-primary ms-2">
                      Invite a Job
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col lg={12}>
                  <div className="mt-3">
                    <p className="text-dark" id="moreText">
                      {description}
                    </p>
                  </div>
                  {isMore ? (
                    <div className="show-more-icon">
                      <button
                        onClick={showHandler}
                        className="mbutton"
                        id="moreBtn"
                      >
                        {showFullDescription ? "less" : "more"}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </div>
    </React.Fragment>
  );
};

export default CandidateDetails;
