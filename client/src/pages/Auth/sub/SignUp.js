import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Card, Col, Input, Row, CardBody } from "reactstrap";
import MetaTags from "react-meta-tags";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { authRegister, authReset } from "../../../redux/Extra/authSlice";
import lightLogo from "../../../assets/images/logo-light.png";
import darkLogo from "../../../assets/images/logo-dark.png";
import signUpImage from "../../../assets/images/auth/sign-up.png";
import LoadingButton from "../../../components/LoadingButton";

const SignUpForSub = () => {
  // Dispatch
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, both } = useSelector(
    (state) => state.auth
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      if (both == true) {
        toast.success("Subcontractor account created Successfully");
        history.push("/joblist");
      } else {
        toast.success("User Registered Successfully");
        history.push("/register-sub");
      }
    }
    dispatch(authReset());
    setIsLoading(false);
  }, [isSuccess, isError]);

  const onSubmit = (data) => {
    const userData = { ...data, identifier: "sub" };
    setIsLoading(true);
    dispatch(authRegister(userData));
  };

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
  // form end validation

  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title>User Sign Up | Bidderbadger</title>
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
                                  <LoadingButton
                                    disabled={isLoading}
                                    className={
                                      "btn btn-primary btn-hover w-100"
                                    }
                                    isLoading={isLoading}
                                    title={"Join Subcontractor"}
                                  />
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
