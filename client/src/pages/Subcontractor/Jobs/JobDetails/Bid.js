import React, { useEffect, useState, memo } from "react";
import { Card, CardBody, Col, Row, Input } from "reactstrap";
import { Form } from "react-bootstrap";
import {
  placeBid,
  proposalReset,
  setIsEdit,
} from "../../../../redux/Subcontractor/proposalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "../../../../components/LoadingButton";

const Bid = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, jobId, proposal, isEdit } = useSelector(
    (state) => state.proposal
  );
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState({
    jobTitle: data.title,
    jobId: jobId,
    bidAmount: "",
    deliveryDate: "",
    proposal: "",
    bid_date: new Date(),
  });

  useEffect(() => {
    if (isEdit == true) {
      setTerms({
        jobTitle: proposal.jobTitle,
        jobId: proposal.jobId,
        bidAmount: proposal.bidAmount,
        deliveryDate: proposal.deliveryDate,
        proposal: proposal.proposal,
        bid_date: proposal.bid_date,
      });
    }
  }, []);

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      const result = message !== "" ? toast.success(message) : null;
      dispatch(setIsEdit(false));
    }
    dispatch(proposalReset());
    setIsLoading(false);
  }, [isSuccess, isError]);

  const editCancel = () => {
    dispatch(setIsEdit(false));
  };

  const handleChange = (e) => {
    setTerms((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    dispatch(placeBid(terms));
  };

  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden mt-4">
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h5 className="mb-1">
                  {isEdit ? "Edit your Bid" : "Place a Bid on this Projec"}{" "}
                </h5>
              </Col>
            </Row>
          </div>
          <Form action="#" onSubmit={handleSubmit}>
            <div className="mt-4">
              <p className="text-muted mb-3">
                You will be able to edit your bid until the project is awarded
                to someone
              </p>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="bidAmount" className="form-label">
                      Bid Amount
                    </label>
                    <Input
                      type="number"
                      className="form-control"
                      id="bidAmount"
                      placeholder="$"
                      name="bidAmount"
                      required
                      defaultValue={terms.bidAmount}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label htmlFor="deliveryDate" className="form-label">
                      The project will be delivered in
                    </label>
                    <Input
                      type="number"
                      className="form-control"
                      id="deliveryDate"
                      placeholder="Days"
                      name="deliveryDate"
                      required
                      defaultValue={terms.deliveryDate}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="mb-3">
                    <label htmlFor="proposal" className="form-label">
                      Describe your proposal
                    </label>
                    <textarea
                      className="form-control"
                      id="inputcoment"
                      name="proposal"
                      required
                      defaultValue={terms.proposal}
                      onChange={handleChange}
                      rows="5"
                      placeholder="What makes you the best candidate for this project?"
                    ></textarea>
                  </div>
                </Col>
              </Row>
              <div className="text-end">
                {isEdit ? (
                  <>
                    <button
                      className="btn btn-danger retractBtn"
                      onClick={editCancel}
                    >
                      Cancel
                    </button>
                    <LoadingButton
                      disabled={isLoading}
                      className={"btn btn-primary"}
                      isLoading={isLoading}
                      title={"Upated Bid"}
                    />
                  </>
                ) : (
                  <LoadingButton
                    disabled={isLoading}
                    className={"btn btn-primary btn-hover"}
                    isLoading={isLoading}
                    title={"Place Bid"}
                  />
                )}
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default memo(Bid);
