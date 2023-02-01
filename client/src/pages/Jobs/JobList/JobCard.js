import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import calculateTimePosted from "../../../helper/calculateTimePosted";
import capitalize from "../../../helper/capitalize";

const JobCard = ({ project }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    project.description.length > 300 ? setIsMore(true) : setIsMore(false);
  }, [project.description.length]);

  // more and less
  const description = showFullDescription
    ? project.description
    : project.description.slice(0, 300) + (isMore ? "..." : "");

  const showHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setShowFullDescription(!showFullDescription);
  };

  return (
    <React.Fragment>
      <div className={"job-box card mt-4"}>
        <div className="p-4">
          <Row>
            <Col lg={12}>
              <div className="mt-3 mt-lg-0">
                <h5 className="fs-17 mb-1">
                  <Link to="/jobdetails" className="text-dark">
                    {capitalize(project.title)}
                  </Link>{" "}
                </h5>
                <ul className="list-inline mt-4 mb-3">
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="uil uil-wallet"></i> Budget: $
                      {project.budget}
                    </p>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="uil uil-clock-three text-primary me-1"></i>
                      Deadline: {project.deadline}
                    </p>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      - Posted {calculateTimePosted(project.date_created)}
                    </p>
                  </li>
                </ul>
                <div className="mt-2">
                  <p className="text-dark" id="moreText">
                    {description}
                  </p>
                </div>
                <ul className="list-inline text-muted mb-0">
                  <li className="list-inline-item text-warning review-rating">
                    <i className="mdi mdi-star align-middle"></i>
                    <i className="mdi mdi-star align-middle"></i>
                    <i className="mdi mdi-star align-middle"></i>
                    <i className="mdi mdi-star align-middle"></i>
                    <i className="mdi mdi-star-half-full align-middle"></i>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">$1k+ spent</p>
                  </li>{" "}
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="mdi mdi-map-marker"></i>
                      {project.location}
                    </p>
                  </li>
                  {isMore ? (
                    <div className="show-more-icon">
                      <button
                        onClick={showHandler}
                        className="mbutton"
                        id="moreBtn"
                      >
                        {showFullDescription ? "less" : "more"}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </ul>
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
            <Col md={4}>
              <div>
                <p className="text-muted mb-0">
                  <span className="text-dark">Proposals :</span>
                  15
                </p>
              </div>
            </Col>
            <Col lg={2} md={3}>
              <div>
                <Link
                  to={"/jobs/" + project["_id"]}
                  target="_blank"
                  className="primary-link"
                >
                  Apply Now <i className="mdi mdi-chevron-double-right"></i>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(JobCard);
