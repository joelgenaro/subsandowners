import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Input, Form, CardBody, Label } from "reactstrap";
import { Link } from "react-router-dom";
import DropZone from "../../../helper/fileUploader";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { createProject, projectReset } from "../../../redux/projectSlice";
import Select from "react-select";
import {
  categoryOptions,
  aluminumOptions,
  cedarOptions,
  chainLinkOptions,
  preasureTreatedOptions,
  vinylOptions,
  colorOptions,
} from "../../../helper/materials";

const RightSideContent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.project);

  const [project, setProject] = useState({
    name: "",
    location: "",
    note: "",
    deadline: "",
    attachments: [],
    materialCategory: "",
    materialStyle: "",
    materialColor: "",
    materialHeight: "",
    removalCategory: "",
    removalAmount: "",
    identifier: "owner",
  });

  const [isShowRadioForRemoval, setIsShowRadioForRemoval] = useState("no");

  const [styleOptions, setStyleOptions] = useState([]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("Project Registered Successfully");
      history.push("/joblist");
    }
    dispatch(projectReset());
  }, [isSuccess, isError, message, history, dispatch]);

  useEffect(() => {
    const initAutocomplete = () => {
      let input = document.getElementById("pac-input");

      let searchBox = new window.google.maps.places.SearchBox(input);

      searchBox.addListener("places_changed", function () {
        setProject((data) => ({
          ...data,
          location: document.getElementById("pac-input").value,
        }));
      });
    };
    initAutocomplete();
  }, []);

  // form
  const handleChange = (e) => {
    setProject((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const setRemovalCategory = (e) => {
    if (e == null) return;

    setProject((data) => ({ ...data, removalCategory: e.value }));
  };

  const setCategory = (e) => {
    if (e == null) return;

    setProject((data) => ({ ...data, materialCategory: e.value }));
    setProject((data) => ({ ...data, materialStyle: "" }));
    setStyleOptions([]);

    switch (e.value) {
      case "Aluminum":
        setStyleOptions(aluminumOptions);
        break;
      case "Cedar":
        setStyleOptions(cedarOptions);
        break;
      case "Chain Link":
        setStyleOptions(chainLinkOptions);
        break;
      case "Preasure Treated":
        setStyleOptions(preasureTreatedOptions);
        break;
      case "Vinyl":
        setStyleOptions(vinylOptions);
        break;

      default:
        break;
    }
  };

  const setStyle = (e) => {
    if (e == null) return;
    setProject((data) => ({ ...data, materialStyle: e.value }));
  };

  const setColor = (e) => {
    if (e == null) return;
    setProject((data) => ({ ...data, materialColor: e.value }));
  };

  const handleOptionChange = (e) => {
    setIsShowRadioForRemoval(e.target.value);
  };

  const setAttachments = (files) => {
    setProject((data) => ({ ...data, attachments: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", project.name);
    data.append("location", project.location);
    data.append("note", project.note);
    data.append("deadline", project.deadline);
    data.append("attachments", project.attachments);
    data.append("materialCategory", project.materialCategory);
    data.append("materialStyle", project.materialStyle);
    data.append("materialColor", project.materialColor);
    data.append("materialHeight", project.materialHeight);
    data.append("removalCategory", project.removalCategory);
    data.append("removalAmount", project.removalAmount);
    data.append("identifier", "owner");

    for (var x = 0; x < project.attachments.length; x++) {
      data.append("attachments", project.attachments[x]);
    }

    dispatch(createProject(data));
  };

  return (
    <React.Fragment>
      <Col lg={8}>
        <Card className="profile-content-page mt-4 mt-lg-0">
          <CardBody className="p-4">
            <Form action="#" onSubmit={handleSubmit}>
              <div>
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Choose a name for your project
                      </label>
                      <Input
                        type="text"
                        defaultValue={project.name}
                        onChange={handleChange}
                        required
                        className="form-control"
                        id="name"
                        name="name"
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="mt-4">
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Label htmlFor="note" className="form-label">
                        Tell us more about your project
                      </Label>
                      <textarea
                        id="note"
                        name="note"
                        defaultValue={project.note}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="5"
                      ></textarea>
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="pac_input" className="form-label">
                        Location
                      </Label>

                      <Input
                        className="form-control"
                        name="location"
                        required
                        defaultValue={project.location}
                        id="pac-input"
                        type="text"
                      />
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="deadline" className="form-label">
                        Date needed to be done
                      </label>
                      <Input
                        type="date"
                        className="form-control"
                        id="deadline"
                        name="deadline"
                        required
                        defaultValue={project.deadline}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              <div>
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Input
                        type="file"
                        className="form-control"
                        id="attachments"
                        name="attachments"
                        multiple
                        onChange={(e) => {
                          setAttachments(e.target.files);
                        }}
                      />
                      {/* <DropZone parentAttachments={setAttachments} /> */}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="mt-4">
                <h5 className="fs-17 fw-semibold mb-3">Material</h5>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="materialCategory" className="form-label">
                        Category
                      </Label>
                      <Select
                        defaultValue={project.materialCategory}
                        onChange={setCategory}
                        options={categoryOptions}
                        isClearable={true}
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="materialStyle" className="form-label">
                        Style
                      </Label>
                      <Select
                        options={styleOptions}
                        defaultValue={project.materialStyle}
                        onChange={setStyle}
                        isClearable={true}
                      />
                    </div>
                  </Col>
                </Row>{" "}
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="materialHeight" className="form-label">
                        Height
                      </Label>
                      <Input
                        className="form-control"
                        name="materialHeight"
                        defaultValue={project.materialHeight}
                        onChange={handleChange}
                        id="materailHeight"
                        type="number"
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="material" className="form-label">
                        Color
                      </Label>
                      <Select
                        defaultValue={project.materialColor}
                        onChange={setColor}
                        options={colorOptions}
                        isClearable={true}
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="mt-4">
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <h5 className="fs-17 fw-semibold mb-3">
                        Are there any removals?
                      </h5>
                    </div>
                  </Col>
                  <Col lg={6} className="radioForRemoval">
                    <div className="form-check mr-3">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault6"
                        defaultValue="no"
                        checked={isShowRadioForRemoval === "no"}
                        onChange={handleOptionChange}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexRadioDefault6"
                      >
                        No
                      </label>
                    </div>
                    <div className="form-check mr-3">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        defaultValue="yes"
                        checked={isShowRadioForRemoval === "yes"}
                        onChange={handleOptionChange}
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="flexRadioDefault2"
                      >
                        Yes
                      </label>
                    </div>
                  </Col>
                </Row>{" "}
                {isShowRadioForRemoval === "yes" ? (
                  <>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="materialCategory"
                            className="form-label"
                          >
                            Category
                          </Label>
                          <Select
                            defaultValue={project.removalCategory}
                            onChange={setRemovalCategory}
                            options={categoryOptions}
                            isClearable={true}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="removalAmount" className="form-label">
                            How many of removal?
                          </Label>
                          <Input
                            name="removalAmount"
                            defaultValue={project.removalAmount}
                            onChange={handleChange}
                            id="materailHeight"
                            type="number"
                          />
                        </div>
                      </Col>
                    </Row>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary">
                  Yes, post my project
                </button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideContent;
