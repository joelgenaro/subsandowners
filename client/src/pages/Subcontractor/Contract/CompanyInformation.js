import React from "react";
import { Card, CardBody, Row } from "reactstrap";
import { useSelector } from "react-redux";
import Stars from "../../../components/Stars";
import Clock from "../../../components/Clock";
import formattedDate from "../../../helper/formattedDate";

const CompanyInformation = () => {
  const { isLoading, data } = useSelector((state) => state.scontract);

  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="job-detail overflow-hidden mt-4">
          <CardBody className="p-4">
            {isLoading ? (
              <Row className="justify-content-center">
                <div
                  className="spinner-border text-primary m-1"
                  role="status"
                ></div>
              </Row>
            ) : (
              <>
                <h6 className="fs-17 mb-3">About the Client</h6>
                <Stars score={data?.ownerInfo?.feedback} />

                <ul className="list-unstyled mt-4 mb-0">
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-location-point icon bg-soft-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-2">
                          {data?.ownerInfo?.country}
                        </h6>
                        <p className="text-muted mb-0">
                          {data?.ownerInfo?.city}{" "}
                          <Clock city={data?.ownerInfo?.city} />
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-star-half-alt icon bg-soft-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-2">
                          {data?.ownerInfo?.jobsPosted.jobsPosted} jobs posted
                        </h6>
                        <p className="text-muted mb-0">
                          {data?.ownerInfo?.jobsPosted.hireRate}% hire rate,{" "}
                          {data?.ownerInfo?.jobsPosted.openJobs} open jobs
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-usd-circle icon bg-soft-primary"></i>
                      <div className="ms-3">
                        <h6 className="fs-14 mb-2">
                          ${data?.ownerInfo?.totalSpent.totalSpent}+ total spent
                        </h6>
                        <p className="text-muted mb-0">
                          {data?.ownerInfo?.totalSpent.hires} hires,{" "}
                          {data?.ownerInfo?.totalSpent.active} active
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="d-flex mt-4">
                      <i className="uil uil-history icon bg-soft-primary"></i>
                      <div className="ms-3">
                        <p className="text-muted mt-3">
                          Member since{" "}
                          {formattedDate(data?.ownerInfo?.memberSince)}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CompanyInformation;
