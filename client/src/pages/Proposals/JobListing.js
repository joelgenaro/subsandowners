import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { myProposal, proposalReset } from "../../redux/proposalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import calculateTimePosted from "../../helper/calculateTimePosted";
import capitalize from "../../helper/capitalize";
import { toLocalDate } from "../../helper/toLocalDate";

const JobListing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, isLoading, proposals } = useSelector(
    (state) => state.proposal
  );

  useEffect(() => {
    dispatch(myProposal());
  }, []);

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
    }
    dispatch(proposalReset());
  }, [isSuccess, isError, message, history, dispatch]);

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          {!isLoading ? (
            proposals ? (
              proposals.map((myProposalDetails, key) => (
                <Card className="myProposal card mt-4" key={key}>
                  <CardBody className="p-4">
                    <Row>
                      <Col lg={3}>
                        <div className="">
                          <h7 className="fs-17 mb-1">
                            <Link to="/jobdetails" className="text-dark">
                              Initiated{" "}
                              {toLocalDate(myProposalDetails.bid_date)}
                            </Link>
                          </h7>
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                {calculateTimePosted(
                                  myProposalDetails.bid_date
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
    </React.Fragment>
  );
};

export default JobListing;
