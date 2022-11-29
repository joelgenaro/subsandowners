import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CandidateDetails from "./CandidateDetails";
import JobFilters from "./JobFilters";
import Section from "./Section";
import Pagination from "./Pagination";
import MetaTags from "react-meta-tags";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./index.css";

import { candidateListService } from "../../../services/Candidate/candidateList";

const CandidateList = () => {
  const [size, setSize] = useState(5);
  const [data, setData] = useState(null);
  const [paginator, setPaginator] = useState(null);

  // get initial data
  useEffect(() => {
    return candidateListService
      .getData(1, size)
      .then((res) => {
        setData(res.data.data.itemsList);
        setPaginator(res.data.data.paginator);
      })
      .catch((err) => {
        NotificationManager.warning(err?.response?.data?.message? err?.response?.data?.message:'error');
      });
  }, []);

  return (
    <React.Fragment>
      <NotificationContainer />
      <MetaTags>
        <title>Candidate List</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <JobFilters
            setData={setData}
            size={size}
            setPaginator={setPaginator}
          />
          <Row>
            <Col lg={12}>
              <CandidateDetails
                size={size}
                setSize={setSize}
                data={data}
                paginator={paginator}
                setData={setData}
                setPaginator={setPaginator}
              />
            </Col>
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

export default CandidateList;
