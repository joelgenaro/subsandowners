import React, { memo, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getData,
  candidateListReset,
  setSize,
} from "../../../redux/Owner/candidateListSlice";

const CandidateList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, isLoading, message, size, paginator, data } =
    useSelector((state) => state.candidateList);

  // Message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      const result = message !== "" ? toast.success(message) : null;
    }
    dispatch(candidateListReset());
  }, [isSuccess, isError]);

  // Get Data
  useEffect(() => {
    dispatch(getData({ page: 1, size: size, isSavedTalent: false }));
  }, [size]);

  // Get Size
  const itemsPerPage = (e) => {
    dispatch(setSize(e.target.value));
  };

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col lg={8}>
          <div className="mb-3 mb-lg-0">
            {paginator ? (
              <h6 className="fs-16 mb-0">
                {" "}
                Showing {paginator.slNo} –{" "}
                {paginator.currentPage * paginator.perPage > paginator.itemCount
                  ? paginator.itemCount
                  : paginator.perPage * paginator.currentPage}{" "}
                of {paginator.itemCount} results{" "}
              </h6>
            ) : (
              ""
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
                    <option value="5">5 </option>
                    <option value="10">10 </option>
                    <option value="20">20 </option>
                    <option value="50">50 </option>
                  </select>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className="candidate-list">
        {!isLoading ? (
          data ? (
            data.map((subcontractor, key) => (
              <CandidateCard key={key} subcontractor={subcontractor} />
            ))
          ) : (
            "No results matched your search"
          )
        ) : (
          <Row className="justify-content-center">
            <div
              className="spinner-border text-primary m-1"
              role="status"
            ></div>
          </Row>
        )}
      </div>
    </React.Fragment>
  );
};

export default memo(CandidateList);
