import React, { useState, useRef, useEffect } from "react";
import {
  Col,
  Row,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Input,
  Form,
  NavItem,
  CardBody,
  Label,
} from "reactstrap";
import classnames from "classnames";
import userImage2 from "../../assets/images/user/img-02.jpg";
import { useSelector, useDispatch } from "react-redux";
import useGeoLocation from "react-ipgeolocation";
import toBase64 from "../../helper/toBase64";
import countries from "../../helper/countries";
import { profileUpdate } from "../../redux/Profile/profileSlice";
import LoadingButton from "../../components/LoadingButton";

const RightSideContent = () => {
  const imageRef = useRef();
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading } = useSelector(
    (state) => state.profile
  );
  const geo = useGeoLocation();
  const role = localStorage.getItem("role");

  const [profile, setProfile] = useState({});
  const [isBtLoading, setIsBtLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [serviceArea, setServiceArea] = useState([]);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    setProfile({
      first_name: data?.first_name,
      last_name: data?.last_name,
      profile: data?.profile,
      phone: data?.phone,
      company: data?.company,
      country: data?.country,
      city: data?.city,
      address: data?.address,
      avatar: data?.avatar != null ? data?.avatar : userImage2,
    });

    const countyValues = data?.service_area.flatMap((item) => {
      return item.county.map((c) => c.value);
    });
    console.log(countyValues);
    setServiceArea(countyValues);
  }, [data]);

  useEffect(() => {
    initAutocomplete();
    setProfile((data) => ({ ...data, country: countries[geo.country] }));
  }, [geo.country]);

  useEffect(() => {
    setIsBtLoading(false);
    setActiveTab("1");
  }, [isSuccess, isError]);

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
      setProfile((data) => ({
        ...data,
        city: document.getElementById("city").value,
      }));
    });
  };

  const handleChange = (e) => {
    setProfile((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsBtLoading(true);
    dispatch(profileUpdate(profile));
  };

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    const basecode = await toBase64(file);

    imageRef.current.src = basecode;

    setProfile((data) => ({ ...data, avatar: basecode }));
  };

  return (
    <React.Fragment>
      <Col lg={8}>
        <Card className="profile-content-page mt-4 mt-lg-0">
          <Nav
            className="profile-content-nav nav-pills border-bottom mb-4"
            id="pills-tab"
            role="tablist"
          >
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  tabChange("1");
                }}
                type="button"
              >
                Overview
              </NavLink>
            </NavItem>
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  tabChange("2");
                }}
                type="button"
              >
                Edit Profile
              </NavLink>
            </NavItem>
          </Nav>

          <CardBody className="p-4">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                {!isLoading ? (
                  <>
                    <div>
                      <h5 className="fs-18 fw-bold">About</h5>
                      <p className="text-muted mt-4">{data?.profile}</p>
                    </div>
                    {role === "sub" ? (
                      <div className="candidate-education-details mt-4">
                        <div className="candidate-education-content mt-4 d-flex">
                          <div className="circle flex-shrink-0 bg-soft-primary">
                            {" "}
                          </div>
                          <div className="ms-4">
                            <h6 className="fs-16 mb-1">Services</h6>
                            <Card className="job-Categories-box bg-light border-0">
                              <CardBody className="p-4">
                                <ul className="list-unstyled job-Categories-list mb-0">
                                  <div className="d-flex flex-wrap align-items-start gap-2">
                                    {data?.services?.map((item) => (
                                      <div
                                        key={item}
                                        className="badge rounded-pill bg-soft-primary subSet"
                                      >
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                </ul>
                              </CardBody>
                            </Card>
                          </div>
                        </div>
                        <div className="candidate-education-content mt-4 d-flex">
                          <div className="circle flex-shrink-0 bg-soft-primary">
                            {" "}
                          </div>
                          <div className="ms-4">
                            <h6 className="fs-16 mb-1">Service Area</h6>
                            <Card className="job-Categories-box bg-light border-0">
                              <CardBody className="p-4">
                                <ul className="list-unstyled job-Categories-list mb-0">
                                  <div className="d-flex flex-wrap align-items-start gap-2">
                                    {serviceArea?.map((item) => (
                                      <div
                                        key={item}
                                        className="badge rounded-pill bg-soft-primary subSet"
                                      >
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                </ul>
                              </CardBody>
                            </Card>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Row className="justify-content-center">
                    <div
                      className="spinner-border text-primary m-1"
                      role="status"
                    ></div>
                  </Row>
                )}
              </TabPane>
              <TabPane tabId="2">
                {!isLoading ? (
                  <Form action="#" onSubmit={handleSubmit}>
                    <div>
                      <h5 className="fs-17 fw-semibold mb-3 mb-0">
                        My Account
                      </h5>
                      <div className="text-center">
                        <div className="mb-4 profile-user">
                          <img
                            src={
                              data?.avatar != null ? data?.avatar : userImage2
                            }
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
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="first_name"
                              name="first_name"
                              required
                              value={profile.first_name}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="lastName" className="form-label">
                              Last Name
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="lastName"
                              name="last_name"
                              required
                              value={profile.last_name}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="phone" className="form-label">
                              Phone
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={profile.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <Label htmlFor="company" className="form-label">
                              Company
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="company"
                              name="company"
                              required
                              value={profile.company}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mt-4">
                      <h5 className="fs-17 fw-semibold mb-3">Profile</h5>
                      <Row>
                        <Col lg={12}>
                          <div className="mb-3">
                            <Label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label"
                            >
                              Introduce Yourself
                            </Label>
                            <textarea
                              className="form-control"
                              rows="5"
                              id="profile"
                              name="profile"
                              required
                              value={profile.profile}
                              onChange={handleChange}
                            ></textarea>
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
                            <label htmlFor="country" className="form-label">
                              Country
                            </label>
                            <Input
                              type="text"
                              id="country"
                              name="country"
                              disabled
                              onChange={handleChange}
                              value={profile.country}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                              City
                            </label>
                            <Input
                              className="form-control"
                              name="city"
                              required
                              defaultValue={profile.city}
                              id="city"
                              type="search"
                            />
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Street Address
                            </label>
                            <Input
                              className="form-control"
                              id="address"
                              name="address"
                              required
                              onChange={handleChange}
                              defaultValue={profile.address}
                              type="search"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mt-4 text-end">
                      <LoadingButton
                        className={"btn btn-primary"}
                        disabled={isBtLoading}
                        isLoading={isBtLoading}
                        title={"Update"}
                      />
                    </div>
                  </Form>
                ) : (
                  <Row className="justify-content-center">
                    <div
                      className="spinner-border text-primary m-1"
                      role="status"
                    ></div>
                  </Row>
                )}
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideContent;
