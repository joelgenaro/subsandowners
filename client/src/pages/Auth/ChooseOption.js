import React from "react";
import MetaTags from "react-meta-tags";

import { Card, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const ChooseOption = () => {
  const subDiv = {
    backgroundColor: "green",
  };
  return (
    <React.Fragment>
      <div>
        <div className="">
          <div className="">
            <MetaTags>
              <title>User Sign Up | Bidderbadger</title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row>
                        <Col lg={6}>
                          <div className="auth-content card-body p-5 text-white">
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>I'm an employer</h5>
                                <p className="text-white-70">
                                  I'm looking for amazing hires
                                </p>
                              </div>
                              <Link
                                to="/signup-owner"
                                className="btn btn-white btn-hover w-100"
                              >
                                LOOKING FOR AMAIZNG HIRES
                              </Link>
                              <div className="mt-3 text-center"></div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div
                            style={subDiv}
                            className="auth-content card-body p-5 text-white"
                          >
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>I'm a worker</h5>
                                <p className="text-white-70">
                                  Looking to find work
                                </p>
                              </div>
                              <Link
                                to="/signup-sub"
                                className="btn btn-white btn-hover w-100"
                              >
                                CREATE AN ACCOUNT
                              </Link>
                              <div className="mt-3 text-center"></div>
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

export default ChooseOption;
