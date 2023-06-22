import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";

const Description = () => {
  const { data } = useSelector((state) => state.scontract);

  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden mt-4">
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h5 className="mb-1">Description</h5>
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <div className="job-detail-desc">
              <p className="text-muted mb-0">{data?.jobDetails?.description}</p>
            </div>
          </div>
          <div className="mt-4">
            <ul className="list-unstyled mt-4 mb-0">
              <li>
                <div className="d-flex mt-5">
                  <div className="ms-3">
                    <Link
                      to={"/jobs/" + data?.jobDetails?.originalJobPostings}
                      target="_blank"
                      className="primary-link"
                    >
                      View original proposal
                      <i className="mdi mdi-chevron-double-right"></i>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Description;
