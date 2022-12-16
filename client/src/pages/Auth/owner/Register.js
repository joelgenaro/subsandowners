import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import {
  Col,
  Row,
  Card,
  Input,
  Form,
  CardBody,
  Container,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { profileUpdate, authReset } from "../../../redux/authSlice";
import MetaTags from "react-meta-tags";
//Images Import
import userImage2 from "../../../assets/images/featured-job/img-01.png";

const RegisterForOwner = () => {
  //Get the whole state from currentAuth
  const imageRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const [owner, setOwner] = useState({
    identifier: "owner",
    companyName: "",
    ownerName: "",
    profile: "",
    phone: "",
    location: "",
    website: "",
    country: "Indonesia",
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

  // declare Owner's country
  // useEffect(() => {
  //   $.ajax({
  //     url: "http://ip-api.com/json",
  //     type: "GET",
  //     success: function (json) {
  //       setOwner((data) => ({ ...data, country: json.country }));
  //     },
  //     error: function (err) {
  //       console.log("Request failed, error= " + err);
  //     },
  //   });
  // }, []);

  function handleChange(e) {
    setOwner((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(profileUpdate(owner));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function handlePhoto(e) {
    const file = e.target.files[0];
    const basecode = await toBase64(file);

    imageRef.current.src = basecode;

    setOwner((data) => ({ ...data, avatar: basecode }));
  }

  const ownerRegisterButtons = {
    display: "flex",
    justifyContent: "space-between",
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
                                        name="avatar"
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
                                        htmlFor="companyName"
                                        className="form-label"
                                      >
                                        Company Name
                                      </label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="companyName"
                                        name="companyName"
                                        value={owner.companyName}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="ownerName"
                                        className="form-label"
                                      >
                                        Owner Name
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="ownerName"
                                        name="ownerName"
                                        value={owner.ownerName}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="mt-4">
                                <h5 className="fs-17 fw-semibold mb-3">
                                  About Company
                                </h5>
                                <Row>
                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="profile"
                                        className="form-label"
                                      ></Label>
                                      <textarea
                                        className="form-control"
                                        rows="5"
                                        id="profile"
                                        name="profile"
                                        value={owner.profile}
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
                                        value={owner.phone}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="location"
                                        className="form-label"
                                      >
                                        Location
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        value={owner.location}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="website"
                                        className="form-label"
                                      >
                                        Webstie
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="website"
                                        name="website"
                                      />
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="country"
                                        className="form-label"
                                      >
                                        Country
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="country"
                                        name="country"
                                        disabled
                                        value={owner.country}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div
                                className="mt-4 text-end "
                                style={ownerRegisterButtons}
                              >
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Submit
                                </button>
                                <Link to="/letsStart" className="btn btn-info">
                                  Skip
                                </Link>
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

export default RegisterForOwner;
