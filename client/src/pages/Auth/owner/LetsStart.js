import React from "react";
import MetaTags from "react-meta-tags";

import lightLogo from "../../../assets/images/logo-light.png";
import darkLogo from "../../../assets/images/logo-dark.png";

import signInImage from "../../../assets/images/process-02.png";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const LetsStart = () => {
  const startedDiv = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  };

  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title></title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row>
                        <Col lg={6} className="text-center">
                          <CardBody className="p-4">
                            <Link to="/">
                              <img
                                src={lightLogo}
                                alt=""
                                className="logo-light"
                              />
                              <img
                                src={darkLogo}
                                alt=""
                                className="logo-dark"
                              />
                            </Link>
                            <div className="mt-5">
                              <img
                                src={signInImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <div className="auth-content card-body p-5 text-white">
                            <div className="w-100" style={startedDiv}>
                              <div className="text-center mb-4">
                                <h1>Let's get started</h1>
                              </div>
                              <div>
                                <Link
                                  to="/job-post"
                                  className="btn btn-white btn-hover w-100"
                                >
                                  Post a job
                                </Link>
                              </div>
                              <div>
                                <Link
                                  to="/candidate-list"
                                  className="btn btn-white btn-hover w-100"
                                >
                                  Browse subcontractor's profile
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LetsStart;
