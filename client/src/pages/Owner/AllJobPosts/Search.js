import React, { memo, useState } from "react";
import { Col, Input, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { filter } from "../../../redux/Owner/jobPostingsSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { paginator } = useSelector((state) => state.jobPostings);
  const [text, setText] = useState(null);

  const handleText = (e) => {
    setText(e.target.value);
  };
  const submit = () => {
    if (!text) return;

    dispatch(filter({ filter: text }));
  };

  return (
    <React.Fragment>
      <Row className="justify-content-start">
        <Col lg={8}>
          <div className="candidate-list-widgets mb-4">
            <Row className="g-2">
               <Col lg={10} className="searchInput">
                  <div className="filter-search-form  mt-3 mt-md-0">
                    <i className="uil uil-briefcase-alt"></i>
                    <Input
                      onChange={handleText}
                      type="search"
                      defaultValue={text}
                      className="form-control filler-job-input-box"
                      id="exampleFormControlInput1"
                      placeholder="Search"
                    />
                  </div>
                  <div className="searchBtn">
                    <button
                      className="btn btn-primary submit-btn w-100 h-100"
                     onClick={submit}
                    >
                      <i className="uil uil-search me-1"></i>
                    </button>
                  </div>
                </Col>
            </Row>
          </div>
        </Col>
        <Col lg={4}>
          <div className="mb-4 allJobShowing">
            {paginator ? (
              <h6 className="fs-16 mb-0">       
                {paginator.slNo} –{" "}
                {paginator.currentPage * paginator.perPage > paginator.itemCount
                  ? paginator.itemCount
                  : paginator.perPage * paginator.currentPage}{" "}
                of {paginator.itemCount} Job Postings{" "}
              </h6>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default memo(Search);
