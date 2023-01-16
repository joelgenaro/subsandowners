import React, { memo } from "react";
import { Form } from "react-bootstrap";
import { Col, Input, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { setFilterOptions } from "../../../redux/jobSlice";

const TextSearch = () => {
  const dispatch = useDispatch();
  const { filterOptions } = useSelector((state) => state.job);

  const filterChange = (e) => {
    e.preventDefault();

    dispatch(setFilterOptions({ ...filterOptions, text: e.target.value }));
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={12}>
          <div className="candidate-list-widgets mb-4">
            <Form action="#">
              <Row className="g-2">
                <Col lg={12}>
                  <div className="filler-job-form">
                    <i className="uil uil-briefcase-alt"></i>
                    <Input
                      type="search"
                      onChange={filterChange}
                      className="form-control filler-job-input-box"
                      id="exampleFormControlInput1"
                      placeholder="Search for projects"
                    />
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default memo(TextSearch);
