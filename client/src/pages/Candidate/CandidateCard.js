import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import tempImage from "../../assets/images/user/img-02.jpg";

const CandidateCard = ({ subcontractor }) => {
  // More and less
  const [showFullDescription, setShowFullDescription] = useState(false);
  const description = showFullDescription
    ? subcontractor.profile
    : subcontractor.profile.slice(0, 200) + "...";

  const showHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className={"candidate-list-box card mt-4"}>
      <Link to="#">
        <CardBody className="p-4">
          <Row className="align-items-center">
            <div className="col-auto">
              <div className="candidate-list-images">
                <img
                  src={subcontractor.avatar ? subcontractor.avatar : tempImage}
                  alt=""
                  className="avatar-md img-thumbnail rounded-circle"
                />
              </div>
            </div>
            <Col lg={4}>
              <div className="candidate-list-content mt-3 mt-lg-0">
                <h5 className="fs-19 mb-0">
                  <p className="primary-link">
                    {subcontractor.firstName + " " + subcontractor.lastName}
                  </p>
                </h5>
                <p className="text-muted mb-2"> </p>
                <ul className="list-inline mb-0 text-muted">
                  <li className="list-inline-item">
                    <i className="mdi   mdi-map-marker"></i>{" "}
                    {subcontractor.location}
                  </li>
                  <li className="list-inline-item">
                    <i className="uil uil-wallet"></i> {subcontractor.salary}
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={5}>
              <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                <p className="text-muted mb-2" id="moreText">
                  {description}
                </p>
              </div>
            </Col>
          </Row>
          <div className="favorite-icon">
            <i className="uil uil-heart-alt fs-18"></i>
          </div>
          <div className="show-more-icon">
            <button onClick={showHandler} className="mbutton" id="moreBtn">
              {showFullDescription ? "less" : "more"}
            </button>
          </div>
        </CardBody>
      </Link>
    </div>
  );
};

export default memo(CandidateCard);
