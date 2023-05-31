import React, { useState, useEffect } from "react";
import { Col, Row, Input, CardBody } from "reactstrap";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail } from "../../redux/Extra/settingsSlice";
import LoadingButton from "../../components/LoadingButton";

const Email = () => {
  const dispatch = useDispatch();
  const { email, isSuccess, isError } = useSelector((state) => state.settings);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(email);
  }, [email]);

  useEffect(() => {
    setIsLoading(false);
  }, [isSuccess, isError]);

  const valueChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === null) return;

    setIsLoading(true);
    dispatch(updateEmail({ email: value }));
  };

  return (
    <React.Fragment>
      <CardBody className="p-4">
        <Form action="#" onSubmit={handleSubmit}>
          <div>
            <Row>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="firstName" className="form-label">
                    Email
                  </label>
                  <Input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    value={value}
                    onChange={valueChange}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4 text-start">
            <LoadingButton
              disabled={isLoading}
              className={"btn btn-primary"}
              isLoading={isLoading}
              title={"Update email address"}
            />
          </div>
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

export default Email;
