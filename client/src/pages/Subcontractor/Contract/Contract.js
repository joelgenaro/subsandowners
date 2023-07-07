import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Section from "./Section";
import Summary from "./Summary";
import Description from "./Description";
import CompanyInformation from "./CompanyInformation";
import Feedback from "./Feedback";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getData,
  scontractReset,
} from "../../../redux/Subcontractor/scontractSlice";
import "./index.css";

const Contract = ({ match }) => {
  const {
    params: { contractId },
  } = match;
  const history = useHistory();
  const dispatch = useDispatch();
  const { data, isSuccess, isError, message } = useSelector(
    (state) => state.scontract
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
    dispatch(scontractReset());
  }, [isSuccess, isError]);

  // Get data
  useEffect(() => {
    dispatch(getData({ id: contractId }));
  }, [contractId, dispatch]);

  return (
    <React.Fragment>
      <MetaTags>
        <title>{data?.jobDetails?.title}</title>
      </MetaTags>
      <Section />
      <section className="section mainSection">
        <Container>
          {data ? (
            <Row>
              <Col lg={8}>
                <Summary />
                <Description />
              </Col>
              <Col lg={4} className="mt-4 mt-lg-0">
                <CompanyInformation />
                {data?.subFeedback?.stars.$numberDecimal == 0 ? (
                  ""
                ) : (
                  <Feedback ID_Application={contractId} />
                )}
              </Col>
            </Row>
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

export default Contract;
