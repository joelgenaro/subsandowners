import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import formattedDate from "../../../helper/formattedDate";

const Summary = () => {
  const { data } = useSelector((state) => state.scontract);

  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden mt-4">
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h5>Summary</h5>
              </Col>
            </Row>
          </div>
          <div className=" summaryContent">
            {" "}
            <div className="">
              <ul className="list-unstyled mt-4 mb-0">
                <li>
                  <div className="d-flex mt-5">
                    <div className="ms-3">
                      <h6 className="fs-14 mb-2">Material Type</h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex mt-4">
                    <div className="ms-3">
                      <h6 className="fs-14 mb-2">Started Date</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="">
              <ul className="list-unstyled mt-4 mb-0">
                <li>
                  <div className="d-flex mt-5">
                    <div className="ms-3">
                      <h6 className="fs-14 mb-2">
                        {data?.jobDetails?.materialCategory}
                      </h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex mt-4">
                    <div className="ms-3">
                      <h6 className="fs-14 mb-2">
                        {formattedDate(data?.jobDetails?.startedDate)}
                      </h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Summary;
