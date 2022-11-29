import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row, Input, Label, Modal, ModalBody } from "reactstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";

import { candidateListService } from "../../../services/Candidate/candidateList";

//Import images
import tempImage from "../../../assets/images/user/img-02.jpg";

const Subcontractor = ({ subcontractor }) => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  // more and less
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
      <NotificationContainer />
      <Link to="#" onClick={(e) => openModal(e)}>
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
                    <i className="mdi mdi-map-marker"></i>{" "}
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
      <div
        className="modal fade"
        id="applyNow"
        tabIndex="-1"
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <Modal
            isOpen={modal}
            toggle={openModal}
            centered
            className="modal-xl"
          >
            <ModalBody className="modal-body p-5 candidateProfile">
              <LeftSideContent subcontractor={subcontractor} />
              <RightSideContent subcontractor={subcontractor} />
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const CandidateDetails = (props) => {
  const { size, setSize, data, setData, paginator, setPaginator } = {
    ...props,
  };

  useEffect(() => {
    return candidateListService
      .getData(1, size)
      .then((res) => {
        setData(res.data.data.itemsList);
        setPaginator(res.data.data.paginator);
      })
      .catch((err) => {
        NotificationManager.warning(
          err?.response?.data?.message ? err?.response?.data?.message : "error"
        );
      });
  }, [size]);

  const itemsPerPage = (e) => {
    setSize(e.target.value);
  };

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col lg={8}>
          <div className="mb-3 mb-lg-0">
            {paginator ? (
              <h6 className="fs-16 mb-0">
                {" "}
                m Showing {paginator.slNo} –{" "}
                {paginator.currentPage * paginator.perPage > paginator.itemCount
                  ? paginator.itemCount
                  : paginator.perPage * paginator.currentPage}{" "}
                of {paginator.itemCount} results{" "}
              </h6>
            ) : (
              <div
                className="spinner-border text-primary m-1"
                role="status"
              ></div>
            )}
          </div>
        </Col>

        <Col lg={4}>
          <div className="candidate-list-widgets">
            <Row>
              <Col lg={6}>
                <div className="selection-widget mt-2 mt-lg-0">
                  <select
                    className="form-select"
                    data-trigger
                    name="choices-candidate-page"
                    id="choices-candidate-page"
                    aria-label="Default select example"
                    onChange={itemsPerPage}
                  >
                    <option value="5">5 per Page</option>
                    <option value="10">10 per Page</option>
                    <option value="15">15 per Page</option>
                    <option value="20">20 per Page</option>
                  </select>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className="candidate-list">
        {data ? (
          data.map((subcontractor, key) => (
            <Subcontractor key={key} subcontractor={subcontractor} />
          ))
        ) : (
          <div className="spinner-border text-primary m-1" role="status"></div>
        )}
      </div>
    </React.Fragment>
  );
};

export default memo(CandidateDetails);
