import React, { useEffect } from "react";
import { Container } from "reactstrap";
import Section from "./Section";
import Category from "./Category";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setJobId,
  applicantsReset,
  getProposals,
  getHiredCandidates,
  getJobDetails,
} from "../../../redux/Owner/applicantsSlice";
import "./index.css";

const Applicants = ({ match }) => {
  const {
    params: { jobId },
  } = match;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector(
    (state) => state.applicants
  );
  const { jobDetails } = useSelector((state) => state.applicants);

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
  }, [isSuccess, isError, message, history, dispatch]);

  useEffect(() => {
    dispatch(setJobId(jobId));
    dispatch(getJobDetails({ id: jobId }));
    dispatch(getProposals({ id: jobId, page: 1 }));
    dispatch(getHiredCandidates({ id: jobId, page: 1 }));
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>{jobDetails?.title}</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Category />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Applicants;
