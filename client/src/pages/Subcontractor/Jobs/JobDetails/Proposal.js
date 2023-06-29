import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Confirm } from "../../../../components/Confirm";
import {
  retract,
  proposalReset,
  setIsEdit,
} from "../../../../redux/Subcontractor/proposalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "../../../../components/LoadingButton";

const Proposal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message, jobId, proposal } = useSelector(
    (state) => state.proposal
  );
  const [isLoading, setIsLoading] = useState(false);

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      const result = message !== "" ? toast.success(message) : null;
    }
    dispatch(proposalReset());
    setIsLoading(false);
  }, [isSuccess, isError]);

  const handleRetract = async () => {
    if (await Confirm("Are you sure you want to retract your bid?")) {
      setIsLoading(true);
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
            <div className="text-end retract">
              <div onClick={handleRetract} className="retractBtn">
                <LoadingButton
                  disabled={isLoading}
                  className={"btn btn-danger"}
                  isLoading={isLoading}
                  title={"Retract"}
                />
              </div>
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
