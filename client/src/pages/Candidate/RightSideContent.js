import React, { useState } from "react";
import { Col, Card, CardBody, Row, Input } from "reactstrap";
import { Link } from "react-router-dom";

//Lightbox
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

//Import Blog Imgaes
import blogImage1 from "../../assets/images/blog/img-01.jpg";
import blogImage2 from "../../assets/images/blog/img-02.jpg";
import blogImage3 from "../../assets/images/blog/img-03.jpg";

//Import user Images
import userImage4 from "../../assets/images/user/img-04.jpg";
import userImage2 from "../../assets/images/user/img-02.jpg";

const images = [blogImage1, blogImage1, blogImage3];

const RightSideContent = ({ subcontractor }) => {
  const [photoIndex, setphotoIndex] = useState(0);
  const [isGallery, setisGallery] = useState(false);
  return (
    <React.Fragment>
      {isGallery ? (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          enableZoom={true}
          onCloseRequest={() => {
            setisGallery(false);
          }}
          onMovePrevRequest={() => {
            setphotoIndex((photoIndex + images.length - 1) % images.length);
          }}
          onMoveNextRequest={() => {
            setphotoIndex((photoIndex + 1) % images.length);
          }}
          imageCaption={"Project " + parseFloat(photoIndex + 1)}
        />
      ) : null}
      <Col lg={8}>
        <Card className="candidate-details ms-lg-4 mt-4 mt-lg-0">
          <CardBody className="p-4 candidate-personal-detail">
            <div>
              <h6 className="fs-17 fw-semibold mb-3">About Me</h6>
              <p className="text-muted mb-2">{subcontractor.profile}</p>
            </div>

            <div className="candidate-education-details mt-4 pt-3">
              <h6 className="fs-17 fw-bold mb-0">Experience</h6>
              <div className="candidate-education-content mt-4 d-flex">
                <div className="circle flex-shrink-0 bg-soft-primary"> W </div>
                <div className="ms-4">
                  <h6 className="fs-16 mb-1">dsfsafdsfsfasdfasdfsadfasd</h6>
                  <p className="mb-2 text-muted">
                    Creative Agency - (2013 - 2016)
                  </p>
                  <p className="text-muted">
                    There are many variations of passages of available, but the
                    majority alteration in some form. As a highly skilled and
                    successfull product development and design specialist with
                    more than 4 Years of My experience.
                  </p>
                </div>
              </div>
              <div className="candidate-education-content mt-4 d-flex">
                <div className="circle flex-shrink-0 bg-soft-primary"> P </div>
                <div className="ms-4">
                  <h6 className="fs-16 mb-1">rfgaegrfdafdsfdfdsafdsf</h6>
                  <p className="mb-2 text-muted">
                    Jobcy Technology Pvt.Ltd - (Pressent)
                  </p>
                  <p className="text-muted mb-0">
                    There are many variations of passages of available, but the
                    majority alteration in some form. As a highly skilled and
                    successfull product development and design specialist with
                    more than 4 Years of My experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="candidate-portfolio mt-4 pt-3">
              <h6 className="fs-17 fw-bold mb-0">Projects</h6>
              <Row>
                <Col lg={4} className="mt-4">
                  <div className="candidate-portfolio-box card border-0">
                    <Link to="#" className="image-popup">
                      <img
                        src={blogImage1}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(0);
                        }}
                        alt=""
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                </Col>
                <Col lg={4} className="mt-4">
                  <div className="candidate-portfolio-box card border-0">
                    <Link to="#" className="image-popup">
                      <img
                        src={blogImage2}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(1);
                        }}
                        alt=""
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                </Col>
                <Col lg={4} className="mt-4">
                  <div className="candidate-portfolio-box card border-0">
                    <Link to="#" className="image-popup">
                      <img
                        src={blogImage3}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(1);
                        }}
                        alt=""
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="mt-4 pt-3">
              <div className="d-sm-flex align-items-top">
                <div className="flex-shrink-0">
                  <img
                    className="rounded-circle avatar-md img-thumbnail"
                    src={userImage4}
                    alt="img"
                  />
                </div>
                <div className="flex-grow-1 ms-sm-3">
                  <div>
                    <p className="text-muted float-end fs-14 mb-2">
                      Jun 23, 2021
                    </p>
                    <h6 className="mt-sm-0 mt-3 mb-1">Michelle Durant</h6>
                    <div className="text-warning review-rating mb-2">
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star-half-full"></i>
                    </div>
                    <p className="text-muted fst-italic">
                      " There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour "
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-sm-flex align-items-top mt-4">
                <div className="flex-shrink-0">
                  <img
                    className="rounded-circle avatar-md img-thumbnail"
                    src={userImage2}
                    alt="img"
                  />
                </div>
                <div className="flex-grow-1 ms-sm-3">
                  <div>
                    <p className="text-muted float-end fs-14 mb-2">
                      Jun 25, 2021
                    </p>
                    <h6 className="mt-sm-0 mt-3 mb-1">Jeffrey Montgomery</h6>
                    <div className="text-warning review-rating mb-2">
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star-half-full"></i>
                      <i className="mdi mdi-star-outline"></i>
                    </div>
                    <p className="text-muted fst-italic">
                      " There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour "
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideContent;
