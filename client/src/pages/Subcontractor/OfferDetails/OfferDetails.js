import React, { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Confirm } from "../../../components/Confirm";
import {
  getData,
  setApplicationId,
  offerReset,
  declineOffer,
  acceptOffer,
} from "../../../redux/Subcontractor/offerSlice";
import Section from "./Section";
import ClientInfo from "./ClientInfo";
import ContractDetails from "./ContractDetails";
import "./index.css";

const OfferDetails = ({ match }) => {
  const {
    params: { applicationId },
  } = match;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.offer);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      if (message === "decline") {
        history.push("/proposals");
      } else if (message === "accept") {
        history.push("/active-contracts");
      }
    }
    dispatch(offerReset());
  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(getData({ id: applicationId }));
    dispatch(setApplicationId(applicationId));
  }, []);

  const onAccept = () => {
    dispatch(acceptOffer({ id: applicationId }));
  };

  const onDecline = async () => {
    if (await Confirm("Are you sure you want to decline this offer?")) {
      dispatch(declineOffer({ id: applicationId }));
    }
  };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Offer Details</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={8}>
              <ContractDetails />
            </Col>

            <Col lg={4} className="mt-4 mt-lg-0">
              <ClientInfo />
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="acceptBtn">
              <p className="text-center">
                Once you accept, you can begin working right away.
              </p>
              <div className="acceptance">
                {" "}
                <button
                  onClick={onDecline}
                  className="btn btn-outline-danger retractBtn"
                >
                  Decline Offer
                </button>
                <button onClick={onAccept} className="btn btn-primary">
                  Accept Offer
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default OfferDetails;
