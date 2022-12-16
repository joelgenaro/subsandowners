import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Input, Label, Row, Modal, ModalBody } from "reactstrap";
import { jobListService } from "../../../services/jobListService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const jobVacancyList = [
  {
    id: 1,
    companyImg: "",
    jobDescription: "Product Director",
    companyName: "Creative Agency",
    location: " Escondido,California",
    jobPostTime: "3 min ago",
    fullTime: true,
    timing: "Full Time",
    addclassNameBookmark: false,
    badges: [],
    experience: "2 - 3 years",
  },
];

const JobVacancyList = (props) => {
  const { size, setSize, data, setData, paginator, setPaginator } = {
    ...props,
  };

  useEffect(() => {
    return jobListService
      .getData(1, size)
      .then((res) => {
        setData(res.data.data.itemsList);
        setPaginator(res.data.data.paginator);
      })
      .catch((err) => {
        NotificationManager.warning(
          err?.response?.data?.message ? err?.response?.data?.message : "error"
        );
      });
  }, [size]);

  const itemsPerPage = (e) => {
    setSize(e.target.value);
  };

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col lg={8}>
          <div className="mb-3 mb-lg-0">
            {paginator ? (
              <h6 className="fs-16 mb-0">
                {" "}
                Showing {paginator.slNo} –{" "}
                {paginator.currentPage * paginator.perPage > paginator.itemCount
                  ? paginator.itemCount
                  : paginator.perPage * paginator.currentPage}{" "}
                of {paginator.itemCount} results{" "}
              </h6>
            ) : (
              <div
                className="spinner-border text-primary m-1"
                role="status"
              ></div>
            )}
          </div>
        </Col>

        <Col lg={4}>
          <div className="candidate-list-widgets">
            <Row>
              <Col lg={6}>
                <div className="selection-widget mt-2 mt-lg-0">
                  <select
                    className="form-select"
                    data-trigger
                    name="choices-candidate-page"
                    id="choices-candidate-page"
                    aria-label="Default select example"
                    onChange={itemsPerPage}
                  >
                    <option value="5">5 per Page</option>
                    <option value="10">10 per Page</option>
                    <option value="15">15 per Page</option>
                    <option value="20">20 per Page</option>
                  </select>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div>
        {data ? (
          <>
            {data.map((job, key) => (
              <div key={key} className="job-box  card mt-4">
                <div className="bookmark-label text-center">
                  <Link to="#" className="align-middle text-white">
                    <i className="mdi mdi-star"></i>
                  </Link>
                </div>
                <div className="p-4">
                  <Row className="align-items-center">
                    <Col md={2}></Col>

                    <Col md={3}>
                      <div className="mb-2 mb-md-0">
                        <h5 className="fs-18 mb-0">
                          <Link to="/jobdetails" className="text-dark">
                            {job.name}
                          </Link>
                        </h5>
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="d-flex mb-2">
                        <div className="flex-shrink-0">
                          <i className="mdi mdi-map-marker text-primary me-1"></i>
                        </div>
                        <p className="text-muted mb-0">{job.location}</p>
                      </div>
                    </Col>

                    <Col md={2}>
                      <div className="d-flex mb-0">
                        <div className="flex-shrink-0">
                          <i className="uil uil-clock-three text-primary me-1"></i>
                        </div>
                        <p className="text-muted mb-0"> {job.deadline}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="p-3 bg-light">
                  <Row className="justify-content-between">
                    <Col md={2}>
                      <div>
                        <p className="text-muted mb-0">
                          {job.materialCategory}
                        </p>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div>
                        <p className="text-muted mb-0">{job.materialStyle}</p>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div>
                        <p className="text-muted mb-0">{job.materialHeight}</p>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div>
                        <p className="text-muted mb-0">{job.materialColor}</p>
                      </div>
                    </Col>
                    <Col lg={2} md={2}>
                      <div>
                        <Link to="#applyNow" className="primary-link">
                          Apply Now{" "}
                          <i className="mdi mdi-chevron-double-right"></i>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ))}
            <div
              className="modal fade"
              id="applyNow"
              tabIndex="-1"
              aria-labelledby="applyNow"
              aria-hidden="true"
            ></div>
          </>
        ) : (
          <div className="spinner-border text-primary m-1" role="status"></div>
        )}
      </div>
    </React.Fragment>
  );
};

export default JobVacancyList;
