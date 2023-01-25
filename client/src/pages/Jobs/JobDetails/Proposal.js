import React, { useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { confirm } from "../../../components/confirmation";
import {
  retract,
  proposalReset,
  setIsEdit,
  setProposal,
} from "../../../redux/proposalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Proposal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, jobId, proposal } = useSelector(
    (state) => state.proposal
  );

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      toast.success("Bid retracted successfully!");
    }
    dispatch(proposalReset());
  }, [isSuccess, isError, message, history, dispatch]);

  const handleRetract = async () => {
    if (await confirm("Are you sure you want to retract your bid?")) {
      dispatch(retract({ id: jobId }));
    }
  };

  const handleEdit = () => {
    dispatch(setIsEdit(true));
  };

  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden mt-4">
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h5 className="mb-1">Your Proposal</h5>
              </Col>
              <Col md={4} className="yourBidTerms">
                <h3 className="mb-1">${proposal?.["bidAmount"]}USD</h3>
                <p className="text-muted mb-0">
                  in {proposal?.["deliveryDate"]} days
                </p>
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <div className="job-detail-desc">
              <p className="text-muted mb-0">{proposal?.["proposal"]}</p>
            </div>
            <div className="text-end">
              <button
                className="btn btn-danger retractBtn"
                onClick={handleRetract}
              >
                Retract
              </button>
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Proposal;
