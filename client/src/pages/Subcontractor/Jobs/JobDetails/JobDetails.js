import React, { useEffect, memo } from "react";
import { Col, Container, Row } from "reactstrap";
import JobDetailsDescription from "./JobDetailsDescription";
import RightSideContent from "./RightSideContent";
import Section from "./Section";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getJobDetails,
  jobReset,
} from "../../../../redux/Subcontractor/jobSlice";
import {
  setJobId,
  getProposal,
} from "../../../../redux/Subcontractor/proposalSlice";
import "./index.css";

const JobDetails = ({ match }) => {
  const {
    params: { jobId },
  } = match;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, isLoading, details, ownerInfo } =
    useSelector((state) => state.job);

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      const result = message !== "" ? toast.success(message) : null;
    }
    dispatch(jobReset());
  }, [isSuccess, isError, message, history, dispatch]);

  // Get data
  useEffect(() => {
    dispatch(getJobDetails({ id: jobId }));
    dispatch(setJobId(jobId));
    dispatch(getProposal({ id: jobId }));
  }, [jobId, dispatch]);

  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          {!isLoading ? (
            details ? (
              <Row>
                <Col lg={8}>
                  <JobDetailsDescription data={details} />
                </Col>
                <Col lg={4} className="mt-4 mt-lg-0">
                  <RightSideContent data={ownerInfo} />
                </Col>
              </Row>
            ) : (
              "No results"
            )
          ) : (
            <Row className="justify-content-center">
              <div
                className="spinner-border text-primary m-1"
                role="status"
              ></div>
            </Row>
          )}
        </Container>
      </section>
    </React.Fragment>
  );
};

export default memo(JobDetails);
