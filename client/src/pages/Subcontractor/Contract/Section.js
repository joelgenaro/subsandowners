import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import Clock from "../../../components/Clock";
import tempImage from "../../../assets/images/user/img-02.jpg";

const Section = () => {
  const { isLoading, data } = useSelector((state) => state.scontract);

  return (
    <React.Fragment>
      <section className="page-title-box contractSection">
        <Container>
          <Row className="justify-content-start">
            <Col md={6}>
              <div className="clientName">
                <div className="candidate-list-images">
                  <img
                    src={data?.ownerInfo?.avatar}
                    alt=""
                    className="avatar-md img-thumbnail rounded-circle"
                  />
                </div>
                <div className="candidate-list-content mt-5 mt-lg-0">
                  <h5 className="fs-19 mb-0">
                    <p className="primary-link">{data?.ownerInfo?.name}</p>
                  </h5>
                  <p className="text-muted mb-2"> </p>
                  <ul className="list-inline mb-0 text-muted">
                    <li className="list-inline-item">
                      <i className="mdi   mdi-map-marker"></i>{" "}
                      {data?.ownerInfo?.city}
                    </li>
                    <li className="list-inline-item">
                      <i className="uil uil-wallet"></i>{" "}
                      <Clock city={data?.ownerInfo?.city} />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-start mt-5">
                <h3>{data?.jobDetails?.title}</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Section;
