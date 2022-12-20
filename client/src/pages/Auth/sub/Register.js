import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Card, Input, CardBody, Container, Label } from "reactstrap";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import userImage2 from "../../../assets/images/user/img-02.jpg";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { profileUpdate, authReset } from "../../../redux/authSlice";
import $ from "jquery";

const RegisterForSub = () => {
  //Get the whole state from currentAuth
  const imageRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const [subcontractor, setSubcontractor] = useState({
    identifier: "sub",
    firstName: "",
    lastName: "",
    profile: "",
    phone: "",
    salary: "",
    location: "",
    country: "",
    avatar: null,
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("Profile Registered Successfully");
      history.push("/joblist");
    }
    dispatch(authReset());
  }, [isSuccess, isError, message, history, dispatch]);

  // declare subcontractor's country
  useEffect(() => {
    $.ajax({
      url: "https://ip-api.com/json",
      type: "GET",
      success: function (json) {
        setSubcontractor((data) => ({ ...data, country: json.country }));
      },
      error: function (err) {
        console.log("Request failed, error= " + err);
      },
    });
  }, []);

  const handleChange = (e) => {
    setSubcontractor((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(profileUpdate(subcontractor));
  };

  // avatar upload
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    const basecode = await toBase64(file);

    imageRef.current.src = basecode;

    setSubcontractor((data) => ({ ...data, avatar: basecode }));
  };

  return (
    <React.Fragment>
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
                <Row className="justify-content-center">
                  <Col xl={8} lg={10}>
                    <Card className="auth-box">
                      <Row className="align-items-center">
                        <Col lg={12} className="text-center">
                          <CardBody className="p-4">
                            <Form action="#" onSubmit={handleSubmit}>
                              <div>
                                <h1 className="">Register</h1>
                                <div className="text-center">
                                  <div className="mb-4 profile-user">
                                    <img
                                      src={userImage2}
                                      className="rounded-circle img-thumbnail profile-img"
                                      id="profile-img"
                                      alt=""
                                      ref={imageRef}
                                    />
                                    <div className="p-0 rounded-circle profile-photo-edit">
                                      <Input
                                        id="profile-img-file-input"
                                        type="file"
                                        className="profile-img-file-input"
                                        onChange={handlePhoto}
                                      />
                                      <Label
                                        htmlFor="profile-img-file-input"
                                        className="profile-photo-edit avatar-xs"
                                      >
                                        <i className="uil uil-edit"></i>
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                                <Row>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="firstName"
                                        className="form-label"
                                      >
                                        First Name (*)
                                      </label>
                                      <Input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        value={subcontractor.firstName}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="lastName"
                                        className="form-label"
                                      >
                                        Last Name (*)
                                      </Label>
                                      <Input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        value={subcontractor.lastName}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="mt-4">
                                <h5 className="fs-17 fw-semibold mb-3">
                                  Profile (*)
                                </h5>
                                <Row>
                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="profile"
                                        className="form-label"
                                      >
                                        Introduce Yourself
                                      </Label>
                                      <textarea
                                        id="profile"
                                        name="profile"
                                        rows="5"
                                        placeholder=""
                                        required
                                        className="form-control"
                                        value={subcontractor.profile}
                                        onChange={handleChange}
                                      ></textarea>
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="phone"
                                        className="form-label"
                                      >
                                        Phone
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={subcontractor.phone}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="salary"
                                        className="form-label"
                                      >
                                        Salary
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="salary"
                                        name="salary"
                                        value={subcontractor.salary}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="location"
                                        className="form-label"
                                      >
                                        Location (*)
                                      </label>
                                      <Input
                                        type="text"
                                        id="location"
                                        name="location"
                                        required
                                        value={subcontractor.location}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="location"
                                        className="form-label"
                                      >
                                        Country
                                      </label>
                                      <Input
                                        type="text"
                                        id="country"
                                        name="country"
                                        disabled
                                        value={subcontractor.country}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="mt-4 text-end">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Submit
                                </button>
                              </div>
                            </Form>
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

export default RegisterForSub;
