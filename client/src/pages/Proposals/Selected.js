import React from "react";
import { Col, Row } from "reactstrap";

const Selected = () => {
  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col lg={8}>
          <div className="mb-4 mb-lg-0">
            <h6 className="mb-0"> Submited proposals </h6>
          </div>
        </Col>
        <Col lg={4}>
          <div className="candidate-list-widgets"></div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Selected;
