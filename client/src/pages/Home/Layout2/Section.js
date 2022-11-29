import React from "react";
import { Col, Container, Row, Form } from "reactstrap";
// import {Link} from "react-router-dom";
import processImage2 from "../../../assets/images/process-02.png";
import JobSearch from "../SubSection/JobSearch";

const section = () => {
    const lookingforTalent = {
        marginTop:'50px'
    }

  return (
    <React.Fragment>
      <section className="bg-home2" id="home">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="mb-4 pb-3 me-lg-5">
                <h6 className="sub-title">We have 150,000+ live jobs</h6>
                <h1 className="display-5 fw-semibold mb-3">
                  Find your dream jobs with{" "}
                  <span className="text-primary fw-bold">Jobcy</span>
                </h1>
              </div>
              <Form action="#">
                <div className="registration-form">
                    <h2>Looking for <span className="text-success fw-bold">Talent?</span></h2>
                  <Row className="g-0">
                    <Col md={8}>
                      <div className="filter-search-form filter-border mt-3 mt-md-0">
                        <i className="uil uil-briefcase-alt"></i>
                        <JobSearch title={'Search subcontractors'}/>
                      </div>
                    </Col>
                    
                    <Col md={4}>
                      <div className="mt-3 mt-md-0 h-100">
                        <button
                          className="btn btn-primary submit-btn w-100 h-100"
                          type="submit"
                        >
                          <i className="uil uil-search me-1"></i> Search
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
              <Form action="#" style={lookingforTalent}>
                <div className="registration-form">
                <h2>Looking for <span className="text-success fw-bold">Work?</span></h2>
                  <Row className="g-0">
                    <Col md={8}>
                      <div className="filter-search-form filter-border mt-3 mt-md-0">
                        <i className="uil uil-briefcase-alt"></i>
                        <JobSearch title={'Search jobs'}/>
                      </div>
                    </Col>
                    
                    <Col md={4}>
                      <div className="mt-3 mt-md-0 h-100">
                        <button
                          className="btn btn-primary submit-btn w-100 h-100"
                          type="submit"
                        >
                          <i className="uil uil-search me-1"></i> Search
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>

            <Col lg={5}>
              <div className="mt-5 mt-md-0">
                <img src={processImage2} alt="" className="home-img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default section;
