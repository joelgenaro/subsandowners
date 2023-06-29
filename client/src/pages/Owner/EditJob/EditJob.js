import React, { useEffect } from "react";
import { Container } from "reactstrap";
import Section from "./Section";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setJobId,
  applicantsReset,
  getJobDetails,
} from "../../../redux/Owner/applicantsSlice";
import ViewJobPost from "../Applicants/ViewJobPost/ViewJobPost";

const Applicants = ({ match }) => {
  const {
    params: { jobId },
  } = match;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.job);

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
    dispatch(applicantsReset());
  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(setJobId(jobId));
    dispatch(getJobDetails({ id: jobId }));
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Edit Job</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <ViewJobPost />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Applicants;
