import React, { memo, useState, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import capitalize from "../../../helper/capitalize";

const JobDetailsDescription = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    job.description.length > 300 ? setIsMore(true) : setIsMore(false);
  }, [job.description.length]);

  // more and less
  const description = showFullDescription
    ? job.description
    : job.description.slice(0, 300) + (isMore ? "..." : "");

  const showHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setShowFullDescription(!showFullDescription);
  };
  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden">
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <Link
                  target="_blank"
                  className="moreLink"
                  to={"/jobs/" + job["_id"]}
                >
                  <h4 className="mb-1">{capitalize(job.title)}</h4>{" "}
                </Link>
              </Col>
              <Col lg={4}>
                <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0">
                  <li className="list-inline-item">
                    <div className="favorite-icon">
                      <Link to="#">
                        <i className="uil uil-heart-alt"></i>
                      </Link>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <div className="job-detail-desc">
              <p className="text-muted mb-0">{description}</p>
            </div>
          </div>

          {isMore ? (
            <div className="show-more-icon">
              <button onClick={showHandler} className="mbutton" id="moreBtn">
                {showFullDescription ? "less" : "more"}
              </button>
            </div>
          ) : (
            ""
          )}

          {job.attachments[0] ? (
            <div className="mt-4">
              <h6 className="mb-3">Attachments</h6>
              <div className="job-detail-desc mt-2">
                <ul className="job-detail-list list-unstyled mb-0 text-muted">
                  {job.attachments.map((ele, key) => (
                    <li key={key}>
                      <i className="uil uil-circle"></i>
                      <a className="downloadLink" href={ele.path}>
                        {ele.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default memo(JobDetailsDescription);
