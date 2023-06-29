import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Input } from "reactstrap";
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
      <Card className="mt-4" id="tabs">
        <div className="p-4 border-bottom filter">
          <h5 className="mb-0">Active Contracts</h5>

          <div className="searchInput">
            <div className="filter-search-form  mt-3 mt-md-0">
              <i className="uil uil-briefcase-alt"></i>
              <Input
                type="search"
                className="form-control filler-job-input-box"
                id="exampleFormControlInput1"
                placeholder="Search"
              />
            </div>
            <div className="searchBtn">
              <button
                className="btn btn-primary submit-btn w-100 h-100"
                type="submit"
              >
                <i className="uil uil-search me-1"></i>
              </button>
            </div>
          </div>
        </div>
        <CardBody className="p-4">
          <div className="">
            <Row>
              <Col lg={12}>
                {!isLoading ? (
                  contracts ? (
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
                                        to={"/ocontract/" + contract._id}
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
                                {formattedDate(contract.date_created)} - Present
                              </p>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    "No proposals"
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
      </Card>
    </React.Fragment>
  );
};

export default Contracts;
