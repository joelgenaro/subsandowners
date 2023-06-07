import React, { useState } from "react";
import { Card, CardBody, Modal, ModalBody, Label } from "reactstrap";
import Stars from "../../../components/Stars";
import Star from "../../../components/Star";
import { useDispatch, useSelector } from "react-redux";
import { giveFeedback } from "../../../redux/Subcontractor/scontractSlice";

const Feedback = ({ ID_Application }) => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.scontract);
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
      giveFeedback({ score: score, feedback: feedback, id: ID_Application })
    );
    setModal(!modal);
  };

  return (
    <React.Fragment>
      <div className="side-bar ms-lg-4">
        <Card className="job-detail overflow-hidden mt-4">
          {data?.ownerFeedback?.stars.$numberDecimal == 0 ? (
            <CardBody className="p-4">
              <div className="job-detail-desc"></div>
              <div className="feedbackBtn">
                <button className="btn btn-primary disable" onClick={openModal}>
                  Send Feedback to Client
                </button>
              </div>
            </CardBody>
          ) : (
            <CardBody className="p-4">
              <div className="mb-3 border-bottom">
                <h6 className="modal-title mb-1" id="staticBackdropLabel">
                  Client’s Feedback to You
                </h6>
                <Stars score={data?.subFeedback?.stars.$numberDecimal} />
                <p className="text-muted">{data?.subFeedback?.feedback}</p>
              </div>
              <div className="mb-3">
                <h6 className="modal-title mb-1" id="staticBackdropLabel">
                  Your Feedback to Client
                </h6>
                <Stars score={data?.ownerFeedback?.stars.$numberDecimal} />
                <p className="text-muted">{data?.ownerFeedback?.feedback}</p>
              </div>
            </CardBody>
          )}
        </Card>
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
                <Label for="messageControlTextarea" className="form-label">
                  Share your experience with this Client
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
                Send the Feedback
              </button>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Feedback;
