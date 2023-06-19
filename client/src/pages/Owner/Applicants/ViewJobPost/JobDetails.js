import React, { memo } from "react";
import { CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setJobEdit } from "../../../../redux/Owner/applicantsSlice";

const JobDetails = () => {
  const dispatch = useDispatch();
  const { isLoading, jobDetails } = useSelector((state) => state.applicants);

  const editJob = () => {
    dispatch(setJobEdit(true));
  };

  return (
    <React.Fragment>
      {!isLoading ? (
        jobDetails ? (
          <CardBody className="p-4">
            <div>
              <Row>
                <Col md={8} className="detailsHeader">
                  <h4 className="mb-1">Project Details</h4>
                  <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0">
                    <li
                      className="list-inline-item"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                    >
                      <Link
                        to="#"
                        onClick={editJob}
                        className="avatar-sm bg-soft-success d-inline-block text-center rounded-circle fs-18"
                      >
                        <i className="uil uil-edit"></i>
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col lg={4}></Col>
              </Row>
            </div>

            <div className="mt-4">
              <Row className="g-2">
                <Col lg={4}>
                  <div className="border rounded-end p-3">
                    <p className="text-muted fs-13 mb-0">Offer Salary</p>
                    <p className="fw-medium mb-0">${jobDetails.budget}</p>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="border rounded-start p-3">
                    <p className="text-muted mb-0 fs-13">Deadline</p>
                    <p className="fw-medium fs-15 mb-0">
                      {jobDetails.deadline}
                    </p>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="border p-3">
                    <p className="text-muted fs-13 mb-0">Material type</p>
                    <p className="fw-medium mb-0">
                      {jobDetails.materialCategory}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mt-4">
              <div className="job-detail-desc">
                <p className="text-muted mb-0">{jobDetails.description}</p>
              </div>
            </div>

            <div className="mt-4">
              <h6 className="mb-3">Material</h6>
              <div className="job-detail-desc mt-2">
                <ul className="job-detail-list list-unstyled mb-0 text-muted">
                  <li>
                    <i className="uil uil-circle"></i> Category:{" "}
                    {jobDetails.materialCategory}
                  </li>
                  <li>
                    <i className="uil uil-circle"></i> Style:{" "}
                    {jobDetails.materialStyle}
                  </li>
                  <li>
                    <i className="uil uil-circle"></i> Height:{" "}
                    {jobDetails.materialHeight}
                  </li>
                  <li>
                    <i className="uil uil-circle"></i> Color:{" "}
                    {jobDetails.materialColor}
                  </li>
                </ul>
              </div>
            </div>

            {jobDetails.removalCategory ? (
              <div className="mt-4">
                <h6 className="mb-3">There are Removals</h6>
                <div className="job-detail-desc mt-2">
                  <ul className="job-detail-list list-unstyled mb-0 text-muted">
                    <li>
                      <i className="uil uil-circle"></i> Category:{" "}
                      {jobDetails.removalCategory}
                    </li>
                    <li>
                      <i className="uil uil-circle"></i> Amount:{" "}
                      {jobDetails.remvovalAmount}
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}

            {jobDetails.attachments[0] ? (
              <div className="mt-4">
                <h6 className="mb-3">Attachments</h6>
                <div className="job-detail-desc mt-2">
                  <ul className="job-detail-list list-unstyled mb-0 text-muted">
                    {jobDetails.attachments.map((ele, key) => (
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
        ) : (
          "No results"
        )
      ) : (
        <Row className="justify-content-center">
          <div className="spinner-border text-primary m-1" role="status"></div>
        </Row>
      )}
    </React.Fragment>
  );
};

export default JobDetails;
