import React from "react";
import { Card, CardBody } from "reactstrap";

const RightSideContent = () => {
  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="job-overview">
          <CardBody className="p-4">
            <h6 className="fs-17">About the Client</h6>
            <ul className="list-unstyled mt-4 mb-0">
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-user icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Job Title</h6>
                    <p className="text-muted mb-0">Product Designer</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-star-half-alt icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Experience</h6>
                    <p className="text-muted mb-0"> 0-3 Years</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-location-point icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Location</h6>
                    <p className="text-muted mb-0"> New york</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-usd-circle icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Offered Salary</h6>
                    <p className="text-muted mb-0">$35k - $45k</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-graduation-cap icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Qualification</h6>
                    <p className="text-muted mb-0">Bachelor Degree</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-building icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Industry</h6>
                    <p className="text-muted mb-0">Private</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-history icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">Date Posted</h6>
                    <p className="text-muted mb-0">Posted 2 hrs ago</p>
                  </div>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>

        <div className="mt-4">
          <h6 className="fs-16 mb-3">Job location</h6>
          <iframe
            title="maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1628067715234!5m2!1sen!2sin"
            style={{ width: `100%`, height: `250` }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RightSideContent;
