import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import capitalize from "../../../helper/capitalize";
import formattedDate from "../../../helper/formattedDate";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getData, myJobsReset } from "../../../redux/Owner/myJobsSlice";

const Contracts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { contracts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.myJobs
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      const result = message !== "" ? toast.success(message) : null;
    }
    dispatch(myJobsReset());
  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <React.Fragment>
      <CardBody className="p-4">
        <div className="">
          <Row>
            <Col lg={12}>
              {!isLoading ? (
                contracts.length ? (
                  contracts.map((contract, key) => (
                    <Card className="myProposal card">
                      <CardBody className="p-4">
                        <Row>
                          <Col lg={5}>
                            <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                <p className="text-muted fs-14 mb-0">
                                  <h7 className="fs-17 mb-1">
                                    <Link
                                      to={"/applicants/" + contract._id}
                                      className="moreLink"
                                    >
                                      {capitalize(contract.title)}
                                    </Link>
                                  </h7>
                                </p>
                              </li>
                            </ul>
                          </Col>

                          <Col lg={3}>
                            <p className="text-muted fs-14">
                              ${contract.budget} Budget
                            </p>
                          </Col>

                          <Col lg={4} className="contractPeriod">
                            <p className="text-muted fs-14 test-align-end">
                              {formattedDate(contract.date_created)} -{" "}
                              {contract.status === "end"
                                ? formattedDate(contract.date_end)
                                : "Present"}
                            </p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  ))
                ) : (
                  <Row className="justify-content-center">No contracts</Row>
                )
              ) : (
                <Row className="justify-content-center">
                  <div
                    className="spinner-border text-primary m-1"
                    role="status"
                  ></div>
                </Row>
              )}
            </Col>
          </Row>
        </div>
      </CardBody>
    </React.Fragment>
  );
};

export default Contracts;
