import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";

//Import Image
import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";

import resetPasswordImage from "../../assets/images/auth/reset-password.png";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, authReset } from "../../redux/Extra/authSlice";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      toast.success(message);
      history.push("/");
    }
    dispatch(authReset());
  }, [isSuccess, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please input your email");
    }
    dispatch(forgotPassword({ email }));
  };

  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title>Sign In to Hire Labors & Find Work | Bidderbadger</title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row className="g-0">
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
                                src={resetPasswordImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <CardBody className="auth-content p-5 h-100 text-white">
                            <div className="text-center mb-4">
                              <h5>Reset Password</h5>
                              <p className="text-white-50">
                                Reset your password with Jobcy.
                              </p>
                            </div>
                            <Form
                              className="auth-form text-white"
                              onSubmit={handleSubmit}
                            >
                              <div
                                className="alert alert-warning text-center mb-4"
                                role="alert"
                              >
                                {" "}
                                Enter your Email and instructions will be sent
                                to you!{" "}
                              </div>
                              <div className="mb-4">
                                <label className="form-label" htmlFor="email">
                                  Username/Email
                                </label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter username or email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                              <div className="mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-white w-100"
                                >
                                  Send Request
                                </button>
                              </div>
                            </Form>
                            <div className="mt-5 text-center text-white-50">
                              <p>
                                Remembered It ?{" "}
                                <Link
                                  to="/signin"
                                  className="fw-medium text-white text-decoration-underline"
                                >
                                  {" "}
                                  Go to Login{" "}
                                </Link>
                              </p>
                            </div>
                          </CardBody>
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

export default ResetPassword;
