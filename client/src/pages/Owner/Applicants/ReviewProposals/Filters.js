import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Col, Input, Row } from "reactstrap";

const Filters = () => {
  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={12}>
          <div className="candidate-list-widgets mb-4">
            <Form action="#">
              <Row className="g-2">
                <Col lg={6} className="searchInput">
                  <div className="filter-search-form  mt-3 mt-md-0">
                    <i className="uil uil-briefcase-alt"></i>
                    <Input
                      type="search"
                      className="form-control filler-job-input-box"
                      id="exampleFormControlInput1"
                      placeholder="Search"
                    />
                  </div>
                  <div className="searchBtn">
                    <button
                      className="btn btn-primary submit-btn w-100 h-100"
                      type="submit"
                    >
                      <i className="uil uil-search me-1"></i>
                    </button>
                  </div>
                </Col>

                {/* <Col lg={3}>
                  <div className="flexCenter">
                    <Link to="#" className="btn btn-primary proposalFilter">
                      <i className="uil uil-filter"></i> Filter
                    </Link>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="filler-job-form">
                    <div className="proposalSort">
                      <h6>Sort: </h6>
                    </div>
                    <select
                      className="form-select selectForm__inner"
                      data-trigger
                      name="choices-single-categories"
                      id="choices-single-categories"
                      aria-label="Default select example"
                    ></select>
                  </div>
                </Col> */}
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Filters;
