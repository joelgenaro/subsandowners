import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import JobDetailsDescription from "./JobDetailsDescription";
import RightSideContent from "./RightSideContent";
import Section from "./Section";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getJobDetails, jobReset } from "../../../redux/jobSlice";
import "./index.css";

const JobDetails = ({ match }) => {
  const {
    params: { jobId },
  } = match;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, isLoading, details } = useSelector(
    (state) => state.job
  );

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
    }
    dispatch(jobReset());
  }, [isSuccess, isError, message, history, dispatch]);

  // Get data
  useEffect(() => {
    dispatch(getJobDetails({ id: jobId }));
  }, [jobId, dispatch]);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Job Details | Jobcy - Job Listing Template | Themesdesign</title>
      </MetaTags>
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
                  <RightSideContent data={details} />
                </Col>
              </Row>
            ) : (
              "No results"
            )
          ) : (
            <div
              className="spinner-border text-primary m-1"
              role="status"
            ></div>
          )}
        </Container>
      </section>
    </React.Fragment>
  );
};

export default JobDetails;
