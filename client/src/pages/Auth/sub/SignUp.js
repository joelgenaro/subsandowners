import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Card, Col, Input, Row, CardBody } from "reactstrap";
import MetaTags from "react-meta-tags";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import { subcontractorService } from "../../../services/Auth/subcontractor";
import { useDispatch } from "react-redux";

import lightLogo from "../../../assets/images/logo-light.png";
import darkLogo from "../../../assets/images/logo-dark.png";
import signUpImage from "../../../assets/images/auth/sign-up.png";

const SignUpForSub = () => {
  //Use for all the dispatch actions
  const dispatch = useDispatch();
  const history = useHistory();

  function onSubmit(data) {
    // create account with gmail
    const { email, password } = data;

    return subcontractorService
      .createAccountGmail({
        email: email,
        password: password,
        isComplete: false,
      })
      .then((res) => {
        dispatch({ type: "CREATE_WITH_GMAIL", payload: email });
        history.push("/registerForSub");
      })
      .catch((err) => {
        NotificationManager.warning(err.response.data.message);
      });
  }

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(Yup.string().required("Password is required"))
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .when("password", (password, schema) => {
        if (password) {
          return schema.required("Confirm Password is required");
        }
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  // form enc validation

  return (
    <React.Fragment>
      <NotificationContainer />
      <div>
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title>
                Sign Up | Jobcy - Job Listing Template | Themesdesign
              </title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                {" "}
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row className="align-items-center">
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
                                src={signUpImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <CardBody className="auth-content p-5 text-white">
                            <div className="w-100">
                              <div className="text-center">
                                <h5>Let's Get Started</h5>
                                <p className="text-white-70">
                                  Sign Up and get access to all the features of
                                  Jobcy
                                </p>
                              </div>
                              <form
                                className="auth-form"
                                onSubmit={handleSubmit(onSubmit)}
                              >
                                <div className="mb-3">
                                  <label
                                    htmlFor="emailInput"
                                    className="form-label"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    id="emailInput"
                                    name="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className={`form-control ${
                                      errors.email ? "is-invalid" : ""
                                    }`}
                                  />
                                  <div className="invalid-feedback">
                                    {errors.email?.message}
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    id="passwordInput"
                                    name="password"
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    className={`form-control ${
                                      errors.password ? "is-invalid" : ""
                                    }`}
                                  />
                                  <div className="invalid-feedback">
                                    {errors.password?.message}
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="confirmPasswordInput"
                                    className="form-label"
                                  >
                                    Confirm Password
                                  </label>
                                  <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPasswordInput"
                                    placeholder="Confirm your password"
                                    {...register("confirmPassword")}
                                    className={`form-control ${
                                      errors.confirmPassword ? "is-invalid" : ""
                                    }`}
                                  />
                                  <div className="invalid-feedback">
                                    {errors.confirmPassword?.message}
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <div className="form-check">
                                    <Input
                                      type="checkbox"
                                      name="flexCheckDefault"
                                      id="flexCheckDefault"
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      I agree to the{" "}
                                      <Link
                                        to="/privacyandpolicy"
                                        className="text-white text-decoration-underline"
                                        target="blank"
                                      >
                                        Terms and conditions
                                      </Link>
                                    </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <button
                                    type="submit"
                                    className="btn btn-white btn-hover w-100"
                                  >
                                    Join Subcontractor
                                  </button>
                                </div>
                              </form>
                              <div className="mt-3 text-center">
                                <p className="mb-0">
                                  Already a member ?{" "}
                                  <Link
                                    to="/signin"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    {" "}
                                    Sign In{" "}
                                  </Link>
                                </p>
                              </div>
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

export default SignUpForSub;
