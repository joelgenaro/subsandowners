import React, { memo } from "react";
import { Card, CardBody, Row } from "reactstrap";
import Stars from "../../../components/Stars";
import Clock from "../../../components/Clock";
import formattedDate from "../../../helper/formattedDate";
import { useSelector } from "react-redux";

const ClientInfo = () => {
  const { ownerInfo } = useSelector((state) => state.offer);

  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="job-overview">
          <CardBody className="p-4">
            {ownerInfo ? (
              <>
                <h6 className="fs-17">About the Client</h6>

                <Stars score={ownerInfo?.feedback} />

                <ul className="list-unstyled mt-4 mb-0">
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-location-point icon bg-soft-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-2">{ownerInfo?.country}</h6>
                        <p className="text-muted mb-0">
                          {ownerInfo?.city} <Clock city={ownerInfo?.city} />
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-star-half-alt icon bg-soft-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-2">
                          {ownerInfo?.jobsPosted.jobsPosted} jobs posted
                        </h6>
                        <p className="text-muted mb-0">
                          {ownerInfo?.jobsPosted.hireRate}% hire rate,{" "}
                          {ownerInfo?.jobsPosted.openJobs} open jobs
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-usd-circle icon bg-soft-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-2">
                          ${ownerInfo?.totalSpent.totalSpent}+ total spent
                        </h6>
                        <p className="text-muted mb-0">
                          {ownerInfo?.totalSpent.hires} hires,{" "}
                          {ownerInfo?.totalSpent.active} active
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-history icon bg-soft-primary"></i>
                      <div className="ms-3">
                        <p className="text-muted mt-3">
                          Member since {formattedDate(ownerInfo?.memberSince)}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </>
            ) : (
              <Row className="justify-content-center">
                <div
                  className="spinner-border text-primary m-1"
                  role="status"
                ></div>
              </Row>
            )}
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default memo(ClientInfo);
