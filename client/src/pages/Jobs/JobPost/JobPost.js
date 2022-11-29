import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { useSelector } from "react-redux";
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

import MetaTags from "react-meta-tags";
//Images Import
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { jobPostService } from "../../../services/Job/post";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./index.css";

import jobImage1 from "../../../assets/images/featured-job/post-a-project-v2.svg";

const JobPost = () => {
  //Get the whole state from currentAuth
  const currentLoggedSub = useSelector((state) => state.currentAuth);
  const history = useHistory();

  const [job, setJob] = useState({
    owner: currentLoggedSub.email,
    name: "",
    description: "",
    budget: "",
    attachments: null,
  });

  const handleChange = (e) => {
    setJob((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  const handlePhoto = (e) => {
    setJob((data) => ({ ...data, attachments: e.target.files[0] }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("owner", job.owner);
    formData.append("name", job.name);
    formData.append("description", job.description);
    formData.append("budget", job.budget);
    formData.append("attachments", job.attachments);

    return jobPostService
      .createJob({
        ...job,
      })
      .then((res) => {
        console.log(res);
        return;
        history.push("/joblist");
      })
      .catch((err) => {
        // NotificationManager.warning(err.response.data.message);
      });
  }

  return (
    <React.Fragment>
      <NotificationContainer />
      <div>
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title>Post a Job</title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={8} lg={10}>
                    <Card className="auth-box">
                      <Row className="align-items-center">
                        <Col lg={12} className="text-center">
                          <CardBody className="p-4">
                            <form action="#" onSubmit={handleSubmit}>
                              <div>
                                <h1 className="title">
                                  <span className="text-success fw-bold">
                                    Tell us what you need done
                                  </span>
                                </h1>

                                <Row>
                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="name"
                                        className="form-label "
                                      >
                                        <h5 className="fs-17 fw-semibold mb-3">
                                          Choose a name for your project
                                        </h5>
                                      </label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={job.name}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="mt-4">
                                <Row>
                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <h5 className="fs-17 fw-semibold mb-3 ">
                                        Tell us more about your project
                                      </h5>
                                      <Label
                                        htmlFor="description"
                                        className="form-label"
                                      ></Label>
                                      <textarea
                                        className="form-control"
                                        rows="5"
                                        id="description"
                                        name="description"
                                        value={job.description}
                                        onChange={handleChange}
                                        required
                                      ></textarea>
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="attachments"
                                        className="form-label"
                                      ></Label>
                                      <Input
                                        className="form-control"
                                        type="file"
                                        id="attachments"
                                        name="attachments"
                                        onChange={handlePhoto}
                                      />
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="budget"
                                        className="form-label "
                                      >
                                        <h5 className="fs-17 fw-semibold mb-3">
                                          What is your budget?
                                        </h5>
                                      </label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="budget"
                                        name="budget"
                                        value={job.budget}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <h5 className="fs-17 fw-semibold mb-3">
                                        Are these details correct?
                                      </h5>
                                      <div className="job-box card mt-4">
                                        <div className="p-4">
                                          <Row>
                                            <Col lg={2}>
                                              <Link to="#">
                                                <img
                                                  src={jobImage1}
                                                  alt=""
                                                  className="img-fluid rounded-3"
                                                />
                                              </Link>
                                              <h5 className="fs-17 fw-semibold mb-3 projectTitle">
                                                PROJECT
                                              </h5>
                                            </Col>
                                            <Col lg={10}>
                                              <div className="mt-3 mt-lg-0">
                                                <h5 className="fs-17 mb-1">
                                                  <Link
                                                    to="#"
                                                    className="text-dark"
                                                  >
                                                    {job.name}
                                                  </Link>{" "}
                                                </h5>

                                                <p className="text-muted fs-14 mb-0">
                                                  {job.description}
                                                </p>
                                              </div>
                                            </Col>
                                          </Row>
                                          <div className="favorite-icon">
                                            <Link to="#">
                                              <i className="uil uil-heart-alt fs-18"></i>
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="p-3 bg-light">
                                          <Row className="justify-content-between">
                                            <Col md={8}>
                                              <div>
                                                <p className="text-muted fs-14 mb-0">
                                                  <i className="uil uil-wallet"></i>{" "}
                                                  {job.budget}
                                                </p>
                                              </div>
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="mt-4 text-end ">
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                >
                                  Yes, post my project
                                </button>
                              </div>
                            </form>
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

export default JobPost;
