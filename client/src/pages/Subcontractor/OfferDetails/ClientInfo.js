import React, { memo } from "react";
import { Card, CardBody } from "reactstrap";

const ClientInfo = () => {
  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="job-overview">
          <CardBody className="p-4">
            <h6 className="fs-17">About the Client</h6>
            <ul className="list-inline text-muted mb-0">
              <li className="list-inline-item text-warning review-rating">
                <span className="badge bg-warning">4.8</span>{" "}
                <i className="mdi mdi-star align-middle"></i>
                <i className="mdi mdi-star align-middle"></i>
                <i className="mdi mdi-star align-middle"></i>
                <i className="mdi mdi-star align-middle"></i>
                <i className="mdi mdi-star-half-full align-middle"></i>
              </li>
            </ul>
            <ul className="list-unstyled mt-4 mb-0">
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-location-point icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">United States</h6>
                    <p className="text-muted mb-0">Springfield 8:42 pm</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-star-half-alt icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">59 jobs posted</h6>
                    <p className="text-muted mb-0">
                      55% hire rate, 2 open jobs
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-usd-circle icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">$30k+ total spent</h6>
                    <p className="text-muted mb-0">32 hires, 3 active</p>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-history icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <p className="text-muted mt-3">Member since Oct 20, 2018</p>
                  </div>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default memo(ClientInfo);
