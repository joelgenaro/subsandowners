import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import calculateTimePosted from "../../../helper/calculateTimePosted";
import capitalize from "../../../helper/capitalize";
import { toLocalDate } from "../../../helper/toLocalDate";
import { useSelector } from "react-redux";

const Submitted = () => {
  const { isLoading, submittedProposals } = useSelector(
    (state) => state.proposal
  );

  return (
    <React.Fragment>
      <Card className="mt-4" id="tabs">
        <div className="p-4 border-bottom">
          <h5 className="mb-0">
            Submitted proposals (
            {submittedProposals ? submittedProposals.length : 0})
          </h5>
        </div>
        <CardBody className="p-4">
          <div className="">
            <Row>
              <Col lg={12}>
                {!isLoading ? (
                  submittedProposals ? (
                    submittedProposals.map((myProposalDetails, key) => (
                      <Card className="myProposal card" key={key}>
                        <CardBody className="p-4">
                          <Row>
                            <Col lg={3}>
                              <div className="">
                                <h7 className="fs-17 mb-1">
                                  <span className="text-dark">
                                    Initiated{" "}
                                    {toLocalDate(
                                      myProposalDetails.date_created
                                    )}
                                  </span>
                                </h7>
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">
                                    <p className="text-muted fs-14 mb-0">
                                      {calculateTimePosted(
                                        myProposalDetails.date_created
                                      )}
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </Col>
                            <Col lg={7}>
                              <div className="mt-3 mt-lg-0">
                                <h5 className="fs-17 mb-1">
                                  <Link
                                    target="_blank"
                                    to={"/jobs/" + myProposalDetails.jobId}
                                    className="moreLink"
                                  >
                                    {capitalize(myProposalDetails.jobTitle)}
                                  </Link>
                                </h5>
                              </div>
                            </Col>

                            <Col lg={2} className="align-self-center"></Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    "No proposals"
                  )
                ) : (
                  <div
                    className="spinner-border text-primary m-1"
                    role="status"
                  ></div>
                )}
                {}
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Submitted;
