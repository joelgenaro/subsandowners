import React, { memo, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Col, Input, Row } from "reactstrap";
import CountryOptions from "../../Home/SubSection/CountryOptions";
import JobType from "../../Home/SubSection/JobType";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { candidateListService } from "../../../services/Candidate/candidateList";

const JobFilters = (props) => {
  const { size, setData, setPaginator } = { ...props };
  const [filter, setFilter] = useState(null);

  const filterHandler = (e) => {
    e.preventDefault();

    if (filter == null) return;

    candidateListService
      .filter({ filter: filter, size: size })
      .then((res) => {
        setData(res.data.data.itemsList);
        setPaginator(res.data.data.paginator);
      })
      .catch((err) => {
        NotificationManager.warning(err?.response?.data?.message?err?.response?.data?.message:'error');
      });
  };

  const filterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={12}>
          <div className="candidate-list-widgets mb-4">
            <Form action="#">
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

                <Col lg={3}>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-primary"
                      onClick={filterHandler}
                    >
                      <i className="uil uil-filter"></i> Filter
                    </Link>
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

export default memo(JobFilters);
