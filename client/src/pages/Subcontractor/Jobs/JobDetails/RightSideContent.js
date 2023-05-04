import React, { memo } from "react";
import { Card, CardBody } from "reactstrap";
import Stars from "../../../../components/Stars";
import Clock from "../../../../components/Clock";
import formattedDate from "../../../../helper/formattedDate";

const RightSideContent = ({ data }) => {
  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="job-overview">
          <CardBody className="p-4">
            <h6 className="fs-17">About the Client</h6>
            <Stars score={data?.feedback} />

            <ul className="list-unstyled mt-4 mb-0">
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-location-point icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">{data?.country}</h6>
                    <p className="text-muted mb-0">
                      {data?.city} <Clock city={data?.city} />
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-star-half-alt icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">
                      {data?.jobsPosted.jobsPosted} jobs posted
                    </h6>
                    <p className="text-muted mb-0">
                      {data?.jobsPosted.hireRate}% hire rate,{" "}
                      {data?.jobsPosted.openJobs} open jobs
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-usd-circle icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <h6 className="fs-14 mb-2">
                      ${data?.totalSpent.totalSpent}+ total spent
                    </h6>
                    <p className="text-muted mb-0">
                      {data?.totalSpent.hires} hires, {data?.totalSpent.active}{" "}
                      active
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex mt-4">
                  <i className="uil uil-history icon bg-soft-primary"></i>
                  <div className="ms-3">
                    <p className="text-muted mt-3">
                      Member since {formattedDate(data?.memberSince)}
                    </p>
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
            src={
              "https://www.google.com/maps/embed/v1/place?key=AIzaSyBbN-R50057ZpqFT3mh4MjRWfc60JupK1A&q=" +
              data.location
            }
            style={{ width: `100%`, height: `250` }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(RightSideContent);
