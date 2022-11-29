import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";

//Import userImage

import tempImage from "../../../assets/images/user/img-02.jpg";

const LeftSideContent = ({ subcontractor }) => {
  return (
    <React.Fragment>
      <Col lg={4}>
        <Card className="side-bar">
          <CardBody className="p-4">
            <div className="candidate-profile text-center">
              <img
                src={subcontractor.avatar ? subcontractor.avatar : tempImage}
                alt=""
                className="avatar-lg rounded-circle"
              />
              <h6 className="fs-18 mb-0 mt-4">
                {subcontractor.firstName + " " + subcontractor.lastName}
              </h6>
            </div>
          </CardBody>

          <CardBody className="candidate-profile-overview border-top p-4">
            <h6 className="fs-17 fw-semibold mb-3">Profile Overview</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <div className="d-flex">
                  <label className="text-dark">Offered Salary</label>
                  <div>
                    <p className="text-muted mb-0">${subcontractor.salary}</p>
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-3">
              <a
                href={"tel:" + subcontractor.phone}
                className="btn btn-danger btn-hover w-100"
              >
                <i className="uil uil-phone"></i> Contact Me
              </a>
            </div>
            <ul className="list-inline d-flex justify-content-between align-items-center mb-0 mt-2">
              <li className="list-inline-item text-warning review-rating">
                <i className="mdi mdi-star"></i>
                <i className="mdi mdi-star"></i>
                <i className="mdi mdi-star"></i>
                <i className="mdi mdi-star"></i>
                <i className="mdi mdi-star-half-full"></i>
              </li>
              <li className="list-inline-item">
                <div className="favorite-icon">
                  <Link to="#">
                    <i className="uil uil-heart-alt fs-18"></i>
                  </Link>
                </div>
              </li>
            </ul>
          </CardBody>

          <CardBody className="candidate-contact-details p-4 border-top">
            <h6 className="fs-17 fw-semibold mb-3">Contact Details</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <div className="d-flex align-items-center mt-4">
                  <div className="icon bg-soft-primary flex-shrink-0">
                    <i className="uil uil-envelope-alt"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-1">Email</h6>
                    <p className="text-muted mb-0">{subcontractor.email}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center mt-4">
                  <div className="icon bg-soft-primary flex-shrink-0">
                    <i className="uil uil-map-marker"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-1">Address</h6>
                    <p className="text-muted mb-0">{subcontractor.location}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center mt-4">
                  <div className="icon bg-soft-primary flex-shrink-0">
                    <i className="uil uil-phone"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-1">Phone</h6>
                    <p className="text-muted mb-0">{subcontractor.phone}</p>
                  </div>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default memo(LeftSideContent);
