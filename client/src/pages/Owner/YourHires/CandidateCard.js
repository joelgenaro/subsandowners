import React, { memo, useState } from "react";
import { Col, Row } from "reactstrap";
import tempImage from "../../../assets/images/user/img-02.jpg";
import { useDispatch } from "react-redux";
import {
  updateFav,
  updateFavOfDB,
} from "../../../redux/Owner/candidateListSlice";

const CandidateCard = ({ subcontractor }) => {
  const dispatch = useDispatch();
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
  const changeFav = () => {
    dispatch(updateFav(subcontractor));
    dispatch(updateFavOfDB(subcontractor));
  };

  return (
    <div
      className={
        subcontractor.is_fav == true
          ? "job-box bookmark-post card mt-4"
          : "job-box bookmark card mt-4"
      }
    >
      <div className="p-4">
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
                  {subcontractor.first_name + " " + subcontractor.last_name}
                </p>
              </h5>
              <p className="text-muted mb-2"> </p>
              <ul className="list-inline mb-0 text-muted">
                <li className="list-inline-item">
                  <i className="mdi mdi-map-marker"></i> {subcontractor.city}
                </li>
                {/* <li className="list-inline-item">
                  <i className="uil uil-wallet"></i> {subcontractor.earned}
                </li> */}
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
          <a href="javascript:;" onClick={changeFav}>
            <i className="uil uil-heart-alt fs-18"></i>
          </a>
        </div>
        <div className="show-more-icon">
          <button onClick={showHandler} className="mbutton" id="moreBtn">
            {showFullDescription ? "less" : "more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CandidateCard);
