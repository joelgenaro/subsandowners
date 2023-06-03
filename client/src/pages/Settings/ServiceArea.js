import React, { useState, useEffect, useRef } from "react";
import { Col, Row, CardBody } from "reactstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import zcta from "us-zcta-counties";
import convertArrToSelect from "../../helper/convertArrToSelect";
import states from "../../helper/states";
import LoadingButton from "../../components/LoadingButton";
import { useSelector, useDispatch } from "react-redux";

const ServiceArea = () => {
  const [state, setState] = useState(null);
  const [county, setCounty] = useState([]);
  const [counties, setCounties] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isSuccess, isError } = useSelector((state) => state.settings);
  const selectRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, [isSuccess, isError]);

  useEffect(() => {
    if (state) {
      if (selectRef.current) {
        selectRef.current.clearValue();
      }
      setCounties(convertArrToSelect(zcta.getCountiesByState(state.value)));
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state) {
      console.log(state, county);
      setIsLoading(true);
    }
  };

  return (
    <React.Fragment>
      <CardBody className="p-4">
        <Form action="#" onSubmit={handleSubmit}>
          <div>
            <Row>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <Select
                    defaultValue={state}
                    onChange={setState}
                    name="state"
                    isClearable={true}
                    options={states}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="county" className="form-label">
                    County
                  </label>
                  <Select
                    defaultValue={county}
                    onChange={setCounty}
                    isMulti
                    isClearable
                    ref={selectRef}
                    name="county"
                    options={counties}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="mt-4 text-end">
            <LoadingButton
              className={"btn btn-primary"}
              disabled={isLoading}
              isLoading={isLoading}
              title={"Save"}
            />
          </div>
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

export default ServiceArea;
