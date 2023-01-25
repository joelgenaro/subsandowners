import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Input } from "reactstrap";
import { Form } from "react-bootstrap";
import {
  placeBid,
  proposalReset,
  setIsEdit,
} from "../../../redux/proposalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Bid = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, isLoading, jobId, proposal, isEdit } =
    useSelector((state) => state.proposal);
  const [terms, setTerms] = useState({
    jobId: jobId,
    bidAmount: "",
    deliveryDate: "",
    proposal: "",
  });

  useEffect(() => {
    if (isEdit == true) {
      setTerms({
        jobId: proposal.jobId,
        bidAmount: proposal.bidAmount,
        deliveryDate: proposal.deliveryDate,
        proposal: proposal.proposal,
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
      if (isEdit) {
        toast.success("You have successfully edited a your bid!");
        dispatch(setIsEdit(false));
      } else {
        toast.success("You have successfully placed a your bid!");
      }
    }
    dispatch(proposalReset());
  }, [isSuccess, isError, message, history, dispatch]);

  const editCancel = () => {
    dispatch(setIsEdit(false));
  };

  const handleChange = (e) => {
    setTerms((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
                    <button type="submit" className="btn btn-primary">
                      Upated Bid
                    </button>
                  </>
                ) : (
                  <button type="submit" className="btn btn-primary btn-hover">
                    Place Bid
                  </button>
                )}
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Bid;
