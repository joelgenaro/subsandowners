import React, { memo } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import calculateTimePosted from "../../../../helper/calculateTimePosted";
import capitalize from "../../../../helper/capitalize";
import Bid from "./Bid";
import Proposal from "./Proposal";
import { useSelector } from "react-redux";

const JobDetailsDescription = ({ data }) => {
  const { proposal, isEdit } = useSelector((state) => state.proposal);

  return (
    <React.Fragment>
      <MetaTags>
        <title>{data.title} | Scheduleasub</title>
      </MetaTags>
      <Card className="job-detail overflow-hidden">
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h4 className="mb-1">{capitalize(data.title)}</h4>
              </Col>
              <Col lg={4}>
                <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0">
                  <li className="list-inline-item">
                    <div className="favorite-icon">
                      <Link to="#">
                        <i className="uil uil-heart-alt"></i>
                      </Link>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2">
              <Col lg={3}>
                <div className="border rounded-end p-3">
                  <p className="text-muted fs-13 mb-0">Offer Salary</p>
                  <p className="fw-medium mb-0">${data.budget}</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border rounded-start p-3">
                  <p className="text-muted mb-0 fs-13">Deadline</p>
                  <p className="fw-medium fs-15 mb-0">{data.deadline}</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3">
                  <p className="text-muted fs-13 mb-0">Material type</p>
                  <p className="fw-medium mb-0">{data.materialCategory}</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3">
                  <p className="text-muted fs-13 mb-0">Date Posted</p>
                  <p className="fw-medium mb-0">
                    {calculateTimePosted(data.date_created)}
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <div className="job-detail-desc">
              <p className="text-muted mb-0">{data.description}</p>
            </div>
          </div>

          <div className="mt-4">
            <h6 className="mb-3">Material</h6>
            <div className="job-detail-desc mt-2">
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>
                  <i className="uil uil-circle"></i> Category:{" "}
                  {data.materialCategory}
                </li>
                <li>
                  <i className="uil uil-circle"></i> Style: {data.materialStyle}
                </li>
                <li>
                  <i className="uil uil-circle"></i> Height:{" "}
                  {data.materialHeight}
                </li>
                <li>
                  <i className="uil uil-circle"></i> Color: {data.materialColor}
                </li>
              </ul>
            </div>
          </div>

          {data.removalCategory ? (
            <div className="mt-4">
              <h6 className="mb-3">There are Removals</h6>
              <div className="job-detail-desc mt-2">
                <ul className="job-detail-list list-unstyled mb-0 text-muted">
                  <li>
                    <i className="uil uil-circle"></i> Category:{" "}
                    {data.removalCategory}
                  </li>
                  <li>
                    <i className="uil uil-circle"></i> Amount:{" "}
                    {data.remvovalAmount}
                  </li>
                </ul>
              </div>
            </div>
          ) : null}

          {data.attachments[0] ? (
            <div className="mt-4">
              <h6 className="mb-3">Attachments</h6>
              <div className="job-detail-desc mt-2">
                <ul className="job-detail-list list-unstyled mb-0 text-muted">
                  {data.attachments.map((ele, key) => (
                    <li key={key}>
                      <i className="uil uil-circle"></i>
                      <a className="downloadLink" href={ele.path}>
                        {ele.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </CardBody>
      </Card>
      {proposal && !isEdit ? <Proposal /> : <Bid data={data} />}
    </React.Fragment>
  );
};

export default memo(JobDetailsDescription);
