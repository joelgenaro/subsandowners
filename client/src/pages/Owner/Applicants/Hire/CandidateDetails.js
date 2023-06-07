import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row, Modal, ModalBody, Label } from "reactstrap";
import { Form } from "react-bootstrap";
import formattedDate from "../../../../helper/formattedDate";
import Stars from "../../../../components/Stars";
import Star from "../../../../components/Star";
import { useSelector, useDispatch } from "react-redux";
import { endContract } from "../../../../redux/Owner/applicantsSlice";

const CandidateDetails = ({ details }) => {
  const { isSuccess, isError } = useSelector((state) => state.applicants);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [starsSelected, setStarsSelected] = useState({
    Skills: 0,
    "Quality of Work": 0,
    Availability: 0,
    Communication: 0,
    Cooperation: 0,
  });

  const starTypes = [
    "Skills",
    "Quality of Work",
    "Availability",
    "Communication",
    "Cooperation",
  ];

  const openModal = () => {
    setModal(!modal);
    setFeedback("");
    setIsDisabled(true);

    starTypes.map((n, i) =>
      setStarsSelected((data) => ({
        ...data,
        [n]: 0,
      }))
    );
  };

  const handleSubmit = () => {
    let totalScore = 0;
    starTypes.map((n, i) => {
      totalScore += starsSelected[n];
    });
    const score = Number((totalScore / 5).toFixed(1));

    dispatch(
      endContract({ score: score, feedback: feedback, id: details._id })
    );
  };

  return (
    <React.Fragment>
      <div className="candidate-list-box card mt-4">
        <CardBody className="p-4">
          <Row>
            <Col lg={1}>
              <img
                src={details.candidate.avatar}
                alt=""
                className="avatar-md img-thumbnail rounded-circle"
              />
            </Col>

            <Col lg={4}>
              <div className="mt-3 mt-lg-0">
                <h5 className="fs-17 mb-1">
                  <Link
                    to={"/subcontractor/" + details.candidateId}
                    className="text-dark titleLink"
                  >
                    {details.candidate.firstName +
                      " " +
                      details.candidate.lastName}
                  </Link>
                </h5>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="mdi mdi-map-marker"></i>
                      {details.candidate.country}
                    </p>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="uil uil-wallet"></i> {details.bidAmount}
                    </p>
                  </li>
                </ul>
                <div className="mt-2">
                  <span>
                    {formattedDate(details.date_started)} -{" "}
                    {details.date_end ? details.end : "present"}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="feedback">
                <span
                  className={
                    details.status === "hired"
                      ? "badge bg-soft-success fs-13 mt-1 mx-1"
                      : details.status === "requestFeedback"
                      ? "badge bg-soft-danger fs-13 mt-1 mx-1"
                      : details.subFeedback.stars.$numberDecimal !== 0
                      ? "badge bg-soft-purple fs-13 mt-1 mx-1"
                      : ""
                  }
                >
                  {details.status === "hired"
                    ? "In progress"
                    : details.status === "requestFeedback"
                    ? "Request Feedback"
                    : details.subFeedback.stars.$numberDecimal !== 0
                    ? "Completed"
                    : ""}
                </span>
                <div className="stars">
                  <Stars score={details.ownerFeedback.stars.$numberDecimal} />
                </div>
              </div>
            </Col>

            <Col lg={1} className="align-self-center">
              <ul className="list-inline mt-3 mb-0">
                <li
                  className="list-inline-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={
                    details.subFeedback.stars.$numberDecimal !== 0
                      ? "View the contract."
                      : "End the contract."
                  }
                >
                  <Link
                    to="#"
                    onClick={openModal}
                    className="avatar-sm bg-soft-success d-inline-block text-center rounded-circle fs-18"
                  >
                    <i
                      className={
                        details.subFeedback.stars.$numberDecimal !== 0
                          ? "uil uil-edit"
                          : "uil uil-cancel"
                      }
                    ></i>
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </CardBody>
      </div>

      {/* Modal */}

      <div
        className="modal fade"
        id="applyNow"
        tabIndex="-1"
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <Form action="#" onSubmit={handleSubmit}>
            <Modal isOpen={modal} toggle={openModal} centered>
              <ModalBody className="modal-body p-5">
                <div className="text-center mb-4">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Job Feedback
                  </h5>
                </div>
                <div className="position-absolute end-0 top-0 p-3">
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                {details.subFeedback.stars.$numberDecimal != 0 ? (
                  <>
                    <div className="mb-3 border-bottom">
                      <h6 className="modal-title mb-1" id="staticBackdropLabel">
                        Subcontractor's feedback to You
                      </h6>
                      <Stars score={details.subFeedback.stars.$numberDecimal} />
                      <p className="text-muted">
                        {details.subFeedback.feedback}
                      </p>
                    </div>
                    <div className="mb-3">
                      <h6 className="modal-title mb-1" id="staticBackdropLabel">
                        Your Feedback to Subcontractor
                      </h6>
                      <Stars
                        score={details.ownerFeedback.stars.$numberDecimal}
                      />
                      <p className="text-muted">
                        {details.ownerFeedback.feedback}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3 ">
                      {starTypes.map((n, t) => (
                        <div className="mb-1" key={t}>
                          <ul className="list-inline text-muted mb-0">
                            <li className="list-inline-item review-rating">
                              {[...Array(5)].map((s, i) => (
                                <Star
                                  key={i}
                                  selected={i < starsSelected[n]}
                                  onClick={() => (
                                    setIsDisabled(false),
                                    setStarsSelected((data) => ({
                                      ...data,
                                      [n]: i + 1,
                                    }))
                                  )}
                                />
                              ))}
                            </li>
                            <li className="list-inline-item review-rating">
                              <p>{n}</p>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mb-3">
                      <Label
                        for="messageControlTextarea"
                        className="form-label"
                      >
                        Share your experience with this subcontractor
                      </Label>
                      <textarea
                        className="form-control"
                        id="messageControlTextarea"
                        rows="4"
                        required
                        placeholder="Enter your feedback"
                        defaultValue={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isDisabled}
                      className="btn btn-primary w-100"
                    >
                      End Contract
                    </button>
                  </>
                )}
              </ModalBody>
            </Modal>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(CandidateDetails);
