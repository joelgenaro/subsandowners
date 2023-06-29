import React, { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import {
  myProposal,
  proposalReset,
} from "../../../redux/Subcontractor/proposalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Submitted from "./Submitted";
import Offer from "./Offer";
import Section from "./Section";
import "./index.css";

const Proposals = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector(
    (state) => state.proposal
  );
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
    dispatch(proposalReset());
  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(myProposal());
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Proposals</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Offer />
          <Submitted />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Proposals;
