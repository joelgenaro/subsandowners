import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row, Modal, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { sendOffer } from "../../../../redux/Owner/applicantsSlice";

const CandidateDetails = ({ jobDetails, details }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const dispatch = useDispatch();

  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  useEffect(() => {
    details.proposal.length > 300 ? setIsMore(true) : setIsMore(false);
  }, [details.proposal.length]);

  // more and less
  const description = showFullDescription
    ? details.proposal
    : details.proposal.slice(0, 300) + (isMore ? "..." : "");

  const showHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setShowFullDescription(!showFullDescription);
  };

  const confirmOffer = () => {
    dispatch(
      sendOffer({ jobId: jobDetails._id, candidateId: details.candidateId })
    );
  };

  return (
    <React.Fragment>
      <div className="candidate-list-box card mt-4">
        <CardBody className="p-4">
          <Row className="">
            <Col lg={2}>
              <div className="candidate-list-images">
                <Link to="#">
                  <img
                    src={details.candidate.avatar}
                    alt=""
                    className="avatar-lg img-thumbnail rounded-circle"
                  />
                </Link>
              </div>
            </Col>

            <Col lg={10}>
              <Row className="">
                <Col lg={6}>
                  <div className="candidate-list-content mt-3 mt-lg-0">
                    <h5 className="fs-19 mb-10">
                      <Link to="/candidatedetails" className="primary-link">
                        {details.candidate.firstName +
                          " " +
                          details.candidate.lastName}
                      </Link>
                    </h5>
                    <p className="text-muted mb-2">
                      <i className="mdi mdi-map-marker"></i>{" "}
                      {details.candidate.country}
                    </p>
                    <ul className="list-inline mb-0 text-muted">
                      <li className="list-inline-item">
                        $ {details.candidate.salary} earned
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="proposalBtn">
                    {details.status === "sendOffer" ? (
                      <span className="badge bg-info awaitingAcceptance">
                        Awaiting Acceptance
                      </span>
                    ) : (
                      <>
                        {""}
                        <Link to="#" className="btn btn-outline-primary">
                          Messages
                        </Link>
                        <Link
                          to="#"
                          onClick={openModal}
                          className="btn btn-primary ms-2"
                        >
                          Hire
                        </Link>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col lg={12}>
                  <div className="mt-3">
                    <p className="text-dark" id="moreText">
                      {description}
                    </p>
                  </div>
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
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </div>
      <div
        className="modal fade"
        id="applyNow"
        tabIndex="-1"
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <Modal isOpen={modal} toggle={openModal} centered size="lg">
            <ModalBody className="modal-body p-5">
              <div className="text-center mb-4">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Send an Offer
                </h5>
              </div>
              <CardBody className="p-4">
                <div className="mt-4">
                  <Row className="g-2">
                    <Col lg={4}>
                      <div className="border rounded-end p-3">
                        <p className="text-muted fs-13 mb-0">Offer Salary</p>
                        <p className="fw-medium mb-0">${jobDetails.budget}</p>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="border rounded-start p-3">
                        <p className="text-muted mb-0 fs-13">Deadline</p>
                        <p className="fw-medium fs-15 mb-0">
                          {jobDetails.deadline}
                        </p>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="border p-3">
                        <p className="text-muted fs-13 mb-0">Material type</p>
                        <p className="fw-medium mb-0">
                          {jobDetails.materialCategory}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="mt-4">
                  <div className="job-detail-desc">
                    <p className="text-muted mb-0">{jobDetails.description}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="mb-3">Material</h6>
                  <div className="job-detail-desc mt-2">
                    <ul className="job-detail-list list-unstyled mb-0 text-muted">
                      <li>
                        <i className="uil uil-circle"></i> Category:{" "}
                        {jobDetails.materialCategory}
                      </li>
                      <li>
                        <i className="uil uil-circle"></i> Style:{" "}
                        {jobDetails.materialStyle}
                      </li>
                      <li>
                        <i className="uil uil-circle"></i> Height:{" "}
                        {jobDetails.materialHeight}
                      </li>
                      <li>
                        <i className="uil uil-circle"></i> Color:{" "}
                        {jobDetails.materialColor}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardBody>
              <button onClick={confirmOffer} className="btn btn-primary w-100">
                Confirm & Send Offer
              </button>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(CandidateDetails);
