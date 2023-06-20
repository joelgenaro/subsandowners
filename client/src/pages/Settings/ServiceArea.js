import React, { useState, useEffect } from "react";
import { Col, Row, CardBody } from "reactstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import zcta from "us-zcta-counties";
import convertArrToSelect from "../../helper/convertArrToSelect";
import states from "../../helper/states";
import LoadingButton from "../../components/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { updateServiceArea } from "../../redux/Extra/settingsSlice";

const ServiceArea = () => {
  const [state, setState] = useState(null);
  const [county, setCounty] = useState(null);
  const [counties, setCounties] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { isSuccess, isError, serviceArea } = useSelector(
    (state) => state.settings
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
  }, [isSuccess, isError]);

  useEffect(() => {
    setData(serviceArea);
  }, [serviceArea]);

  useEffect(() => {
    if (state) {
      const value = data.find((obj) => obj.state == state.value);

      setCounty(value.county);
      setCounties(convertArrToSelect(zcta.getCountiesByState(state.value)));
    } else {
      setCounty([]);
      setCounties([]);
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state) {
      setIsLoading(true);
      dispatch(updateServiceArea({ state: state, county: county }));
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
                    name="state"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    defaultValue={state}
                    value={state}
                    onChange={setState}
                    isClearable={true}
                    options={states}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="county" className="form-label">
                    County
                  </label>
                  <Select
                    name="county"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isMulti
                    isClearable
                    defaultValue={county}
                    value={county}
                    onChange={setCounty}
                    options={counties}
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
