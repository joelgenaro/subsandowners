import React from "react";
import { Card, CardBody, Col, Row, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { calculateTimePosted } from "../../../helper/calculateTimePosted";
import { capitalize } from "../../../helper/capitalize";

const JobDetailsDescription = ({ data }) => {
  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden">
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h4 className="mb-1">{capitalize(data.name)}</h4>
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
                    {calculateTimePosted(data.Date)}
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <div className="job-detail-desc">
              <p className="text-muted mb-0">{data.note}</p>
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
      <Card className="job-detail overflow-hidden mt-4">
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h5 className="mb-1">Place a Bid on this Project</h5>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <p className="text-muted mb-3">
              You will be able to edit your bid until the project is awarded to
              someone
            </p>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="inputemail" className="form-label">
                    Bid Amount
                  </label>
                  <Input
                    type="number"
                    className="form-control"
                    id="inputemail"
                    placeholder="$"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="inputsubject" className="form-label">
                    The project will be delivered in
                  </label>
                  <Input
                    type="number"
                    className="form-control"
                    id="inputsubject"
                    placeholder="Days"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="inputcoment" className="form-label">
                    Describe your proposal
                  </label>
                  <textarea
                    className="form-control"
                    id="inputcoment"
                    rows="5"
                    placeholder="What makes you the best candidate for this project?"
                  ></textarea>
                </div>
              </Col>
            </Row>
            <div className="text-end">
              <button type="submit" className="btn btn-primary btn-hover">
                Place Bid
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default JobDetailsDescription;
