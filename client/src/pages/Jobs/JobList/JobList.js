import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import Section from "../../Jobs/JobList/Section";
import JobVacancyList from "./JobVacancyList";
import JobFilters from "./JobFilters";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./index.css";
import { jobListService } from "../../../services/jobListService";

const JobList = (props) => {
  const [size, setSize] = useState(5);
  const [data, setData] = useState(null);
  const [paginator, setPaginator] = useState(null);

  // get initial data
  useEffect(() => {
    return jobListService
      .getData(1, size)
      .then((res) => {
        setData(res.data.data.itemsList);
        setPaginator(res.data.data.paginator);
      })
      .catch((err) => {
        NotificationManager.warning(
          err?.response?.data?.message ? err?.response?.data?.message : "error"
        );
      });
  }, []);

  console.log(data);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Job List | Jobcy - Job Listing Template | Themesdesign</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="me-lg-5">
                <JobFilters
                  setData={setData}
                  size={size}
                  setPaginator={setPaginator}
                />
                <JobVacancyList
                  size={size}
                  setSize={setSize}
                  data={data}
                  paginator={paginator}
                  setData={setData}
                  setPaginator={setPaginator}
                />
              </div>
            </Col>
            <Sidebar />
          </Row>
          <Pagination
            size={size}
            paginator={paginator}
            setPaginator={setPaginator}
            setData={setData}
          />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default JobList;
