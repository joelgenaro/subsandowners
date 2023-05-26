import React from "react";
import { Col, Row, Card, Input, CardBody, Container, Label } from "reactstrap";
import { Form } from "react-bootstrap";

const Email = () => {
  const handleSubmit = () => {};

  return (
    <React.Fragment>
      <CardBody className="p-4">
        <Form action="#" onSubmit={handleSubmit}>
          <div>
            <Row>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="firstName" className="form-label">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    // value={profile.first_name}
                    // onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="firstName" className="form-label">
                    New Password
                  </label>
                  <Input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    // value={profile.first_name}
                    // onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="firstName" className="form-label">
                    Confirm Password
                  </label>
                  <Input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    // value={profile.first_name}
                    // onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4 text-start">
            <button type="submit" className="btn btn-primary">
              Save settings
            </button>
          </div>
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

export default Email;
