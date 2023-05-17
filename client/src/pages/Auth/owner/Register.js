import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Card, Input, CardBody, Container, Label } from "reactstrap";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import userImage2 from "../../../assets/images/user/img-02.jpg";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { profileUpdate, authReset } from "../../../redux/Extra/authSlice";
import useGeoLocation from "react-ipgeolocation";
import toBase64 from "../../../helper/toBase64";
import countries from "../../../helper/countries";

const ownerRegisterButtons = {
  display: "flex",
  justifyContent: "space-between",
};

const RegisterForOwner = () => {
  //Get the whole state from currentAuth
  const imageRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const geo = useGeoLocation();

  const [subcontractor, setSubcontractor] = useState({
    first_name: "",
    last_name: "",
    profile: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    avatar: null,
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      toast.success("Profile Registered Successfully");
      history.push("/lets-start");
    }
    dispatch(authReset());
  }, [isSuccess, isError, message, history, dispatch]);

  useEffect(() => {
    initAutocomplete();
    setSubcontractor((data) => ({ ...data, country: countries[geo.country] }));
  }, [geo.country]);

  // Location Autocomplete
  const initAutocomplete = () => {
    const cityOption = {
      types: ["(cities)"],
      componentRestrictions: { country: geo.country },
    };

    let cityInput = document.getElementById("city");

    let searchBoxCity = new window.google.maps.places.Autocomplete(
      cityInput,
      cityOption
    );

    searchBoxCity.addListener("place_changed", function () {
      setSubcontractor((data) => ({
        ...data,
        city: document.getElementById("city").value,
      }));
    });
  };

  const handleChange = (e) => {
    setSubcontractor((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(profileUpdate(subcontractor));
  };

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
              <title>User Register | Bidderbadger</title>
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
                                        htmlFor="first_name"
                                        className="form-label"
                                      >
                                        First Name
                                      </label>
                                      <Input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        required
                                        value={subcontractor.first_name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="last_name"
                                        className="form-label"
                                      >
                                        Last Name
                                      </Label>
                                      <Input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        required
                                        value={subcontractor.last_name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="mt-4">
                                <h5 className="fs-17 fw-semibold mb-3">
                                  Profile
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
                                </Row>
                              </div>

                              <div className="mt-4">
                                <h5 className="fs-17 fw-semibold mb-3">
                                  Where are you located?
                                </h5>
                                <Row>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="country"
                                        className="form-label"
                                      >
                                        Country
                                      </label>
                                      <Input
                                        type="text"
                                        id="country"
                                        name="country"
                                        disabled
                                        onChange={handleChange}
                                        value={subcontractor.country}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="city"
                                        className="form-label"
                                      >
                                        City
                                      </label>
                                      <Input
                                        className="form-control"
                                        name="city"
                                        required
                                        defaultValue={subcontractor.city}
                                        id="city"
                                        type="search"
                                      />
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="address"
                                        className="form-label"
                                      >
                                        Street Address
                                      </label>
                                      <Input
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        required
                                        onChange={handleChange}
                                        defaultValue={subcontractor.address}
                                        type="search"
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
