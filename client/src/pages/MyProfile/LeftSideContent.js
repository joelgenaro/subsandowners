import React, { useState, useEffect } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { useSelector } from "react-redux";
import profileImage from "../../assets/images/user/img-02.jpg";
import formattedDate from "../../helper/formattedDate";
import Stars from "../../components/Stars";
import Clock from "../../components/Clock";

const LeftSideContent = () => {
  const { data } = useSelector((state) => state.profile);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSleeping, setIsSleeping] = useState(false);

  const candidateActiveStatusClassName =
    "profile-active profile-resume-active position-absolute badge rounded-circle bg-success";
  const candidateInActiveStatusClassName =
    "profile-active profile-resume-active position-absolute badge rounded-circle bg-secondary";
  const candidateSleepingStatusClassName =
    "profile-active profile-resume-active position-absolute badge rounded-circle bg-warning";

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      setIsSleeping(true);
    } else {
      setIsSleeping(false);
    }
  };

  return (
    <React.Fragment>
      <Col lg={4}>
        <Card className="profile-sidebar me-lg-4">
          <CardBody className="p-4">
            <div className="text-center pb-4 border-bottom">
              <img
                src={data?.avatar != null ? data.avatar : profileImage}
                alt=""
                className="avatar-lg img-thumbnail rounded-circle mb-4"
              />
              <h5 className="mb-2">
                {data?.first_name + " " + data?.last_name}
              </h5>

              <ul className="list-inline d-flex justify-content-center align-items-center ">
                <Stars score={data?.feedback} />
              </ul>
            </div>

            <div className="mt-4 border-bottom pb-4">
              <div className="profile-contact">
                <ul className="list-unstyled mb-0">
                  <li>
                    <div className="d-flex align-start">
                      <label className="profile_label">
                        {" "}
                        <span
                          className={
                            isOnline
                              ? isSleeping
                                ? candidateSleepingStatusClassName
                                : candidateActiveStatusClassName
                              : candidateInActiveStatusClassName
                          }
                        >
                          <span className="visually-hidden">active</span>
                        </span>
                      </label>

                      <div>
                        {isOnline ? (
                          isSleeping ? (
                            <p className="text-warning text-break mb-0">
                              I'm Away
                            </p>
                          ) : (
                            <p className="text-success text-break mb-0">
                              I'm Online!
                            </p>
                          )
                        ) : (
                          <p className="text-secondary text-break mb-0">
                            I'm Offline
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items">
                      <label className="profile_label">
                        <i className="uil uil-clock-three text-primary me-1"></i>
                      </label>
                      <div>
                        <p className="text-muted mb-0">
                          It's currently <Clock city={data?.city} />
                          &nbsp; here
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items">
                      <label className="profile_label">
                        <i className="mdi mdi-star"></i>
                      </label>
                      <div>
                        <p className="text-muted mb-0">
                          Joined {formattedDate(data?.join_date)}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="fs-17 fw-bold mb-3">Contacts</h5>
              <div className="profile-contact">
                <ul className="list-unstyled mb-0">
                  <li>
                    <div className="d-flex">
                      <label>Email</label>
                      <div>
                        <p className="text-muted text-break mb-0">
                          {data?.email}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label>Phone Number</label>
                      <div>
                        <p className="text-muted mb-0">{data?.phone}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <label>Location</label>
                      <div>
                        <p className="text-muted mb-0">
                          {data?.city + " " + data?.country}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default LeftSideContent;
