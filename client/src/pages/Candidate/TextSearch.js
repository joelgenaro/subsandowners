import React, { memo } from "react";
import { Col, Input, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { filter } from "../../redux/candidateListSlice";

const TextSearch = () => {
  const dispatch = useDispatch();
  const { size } = useSelector((state) => state.candidateList);

  const filterChange = (e) => {
    dispatch(filter({ filter: e.target.value, size: size }));
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={12}>
          <div className="candidate-list-widgets mb-4">
            <Row className="g-2">
              <Col lg={9}>
                <div className="filler-job-form">
                  <i className="uil uil-briefcase-alt"></i>
                  <Input
                    type="search"
                    onChange={filterChange}
                    className="form-control filler-job-input-box"
                    id="exampleFormControlInput1"
                    placeholder="Subcontractor Name, Salary, Location..."
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default memo(TextSearch);
