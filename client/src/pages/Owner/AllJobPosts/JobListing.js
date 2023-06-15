import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {
  getData,
  jobPostingsReset,
  deleteJob,
} from "../../../redux/Owner/jobPostingsSlice";
import calculateTimePosted from "../../../helper/calculateTimePosted";
import capitalize from "../../../helper/capitalize";
import { Confirm } from "../../../components/Confirm";

const JobListing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, isLoading, message, data } = useSelector(
    (state) => state.jobPostings
  );
  // Get Data
  useEffect(() => {
    dispatch(getData({ page: 1 }));
  }, [dispatch]);

  // Message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      const result = message !== "" ? toast.success(message) : null;
    }
    dispatch(jobPostingsReset());
  }, [isSuccess, isError, message, dispatch]);

  const onDeleteJob = async (id) => {
    if (await Confirm("Are you sure you want to delete your job?")) {
      dispatch(deleteJob({ id: id }));
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          {!isLoading ? (
            data ? (
              data.map((jobListingDetails, key) => (
                <Card className="job-box card mt-4" key={key}>
                  <CardBody className="p-4">
                    <Row>
                      <Col lg={6}>
                        <div className="mt-3 mt-lg-0">
                          <h5 className="fs-17 mb-1">
                            <Link
                              to={"/applicants/" + jobListingDetails["_id"]}
                              className="text-dark titleLink"
                            >
                              {capitalize(jobListingDetails.title)}
                            </Link>
                          </h5>
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                {calculateTimePosted(
                                  jobListingDetails.date_created
                                )}{" "}
                                by You
                              </p>
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mt-3 mt-lg-0">
                          <ul className="list-inline mb-0 proposalStatusbar">
                            <li className="list-inline-item">
                              <div className="mr-3">
                                <h5 className="fs-17 mb-1">
                                  {jobListingDetails.proposals}
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  Proposals
                                </p>
                              </div>
                            </li>
                            <li className="list-inline-item">
                              <div className="mr-3">
                                <h5 className="fs-17 mb-1">
                                  {jobListingDetails.messaged}
                                </h5>
                                <p className="text-muted fs-14 mb-0">
                                  Messaged
                                </p>
                              </div>
                            </li>
                            <li className="list-inline-item">
                              <div className="mr-3">
                                <h5 className="fs-17 mb-1">
                                  {jobListingDetails.hired}
                                </h5>
                                <p className="text-muted fs-14 mb-0">Hired</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </Col>

                      <Col lg={2} className="align-self-center">
                        <ul className="list-inline mt-3 mb-0">
                          <li
                            className="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Delete"
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                onDeleteJob(jobListingDetails["_id"]);
                              }}
                              className="avatar-sm bg-soft-danger d-inline-block text-center rounded-circle fs-18"
                            >
                              <i className="uil uil-trash-alt"></i>
                            </Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
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
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default JobListing;
