import React, { useEffect, useState } from "react";
import { Col, Row, Input, Form, CardBody, Label } from "reactstrap";
import {
  categoryOptions,
  aluminumOptions,
  cedarOptions,
  chainLinkOptions,
  preasureTreatedOptions,
  vinylOptions,
  colorOptions,
} from "../../../../helper/materials";
import { Link } from "react-router-dom";
import {
  setJobEdit,
  updateJob,
  setJobDetails,
} from "../../../../redux/Owner/applicantsSlice";
import { useDispatch, useSelector } from "react-redux";
import SelectOptions from "../../../../components/SelectOptions";

const EditJob = () => {
  const dispatch = useDispatch();
  const { jobDetails } = useSelector((state) => state.applicants);
  const [project, setProject] = useState({});
  const [isShowRadioForRemoval, setIsShowRadioForRemoval] = useState("no");
  const [styleOptions, setStyleOptions] = useState([]);

  useEffect(() => {
    setProject({ ...jobDetails });
    styleOptionsToSwitch(jobDetails.materialCategory);
  }, []);

  // Google map Input
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

  const editCancel = () => {
    dispatch(setJobEdit(false));
  };

  const handleChange = (e) => {
    setProject((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleOptionChange = (e) => {
    setIsShowRadioForRemoval(e.target.value);
  };

  const setCategory = (e) => {
    if (e == null) return;
    setProject((data) => ({ ...data, materialCategory: e.target.value }));
    setProject((data) => ({ ...data, materialStyle: "" }));
    styleOptionsToSwitch(e.target.value);
  };

  const setStyle = (e) => {
    if (e == null) return;
    setProject((data) => ({ ...data, materialStyle: e.target.value }));
  };

  const setColor = (e) => {
    if (e == null) return;
    setProject((data) => ({ ...data, materialColor: e.target.value }));
  };

  const setRemovalCategory = (e) => {
    if (e == null) return;
    setProject((data) => ({ ...data, removalCategory: e.target.value }));
  };

  const styleOptionsToSwitch = (category) => {
    setStyleOptions([]);

    switch (category) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateJob(project));
    dispatch(setJobDetails(project));
    dispatch(setJobEdit(false));
  };

  return (
    <React.Fragment>
      <div className="editJobContent">
        <Col lg={8} className="justify-content-center">
          <div className="profile-content-page mt-4 mt-lg-0">
            <CardBody className="p-4">
              <Form action="#" onSubmit={handleSubmit}>
                <div>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label htmlFor="title" className="form-label">
                          Project Name
                        </Label>
                        <Input
                          className="form-control"
                          placeholder=""
                          type="text"
                          required
                          defaultValue={project.title}
                          onChange={handleChange}
                          id="title"
                          name="title"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="mt-4">
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label htmlFor="description" className="form-label">
                          Project Description
                        </Label>
                        <textarea
                          id="description"
                          name="description"
                          required
                          value={project.description}
                          onChange={handleChange}
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
                          required
                          name="location"
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

                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="budget" className="form-label">
                          What is your estimated budget?
                        </Label>

                        <Input
                          className="form-control"
                          name="budget"
                          placeholder="$"
                          required
                          defaultValue={project.budget}
                          onChange={handleChange}
                          id="budget"
                          min={1}
                          type="number"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        {/* <DropZone parentAttachments={} /> */}
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="mt-4">
                  <h5 className="fs-17 fw-semibold mb-3">Material</h5>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label
                          htmlFor="materialCategory"
                          className="form-label"
                        >
                          Category
                        </Label>
                        <select
                          required
                          className="form-select selectForm__inner"
                          data-trigger
                          name="choices-single-categories"
                          id="choices-single-categories"
                          aria-label="Default select example"
                          onChange={setCategory}
                        >
                          <SelectOptions
                            datas={categoryOptions}
                            defaultValue={project.materialCategory}
                          />
                        </select>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="materialStyle" className="form-label">
                          Style
                        </Label>
                        <select
                          required
                          className="form-select selectForm__inner"
                          data-trigger
                          name="choices-single-categories"
                          id="choices-single-categories"
                          aria-label="Default select example"
                          onChange={setStyle}
                        >
                          <SelectOptions
                            datas={styleOptions}
                            defaultValue={project.materialStyle}
                          />
                        </select>
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
                        <select
                          required
                          className="form-select selectForm__inner"
                          data-trigger
                          name="choices-single-categories"
                          id="choices-single-categories"
                          aria-label="Default select example"
                          onChange={setColor}
                        >
                          <SelectOptions
                            datas={colorOptions}
                            defaultValue={project.materialColor}
                          />
                        </select>
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
                            <select
                              className="form-select selectForm__inner"
                              data-trigger
                              name="choices-single-categories"
                              id="choices-single-categories"
                              aria-label="Default select example"
                              onChange={setRemovalCategory}
                            >
                              <SelectOptions
                                datas={categoryOptions}
                                defaultValue={project.removalCategory}
                              />
                            </select>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label
                              htmlFor="removalAmount"
                              className="form-label"
                            >
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
                  <Link
                    to="#"
                    onClick={editCancel}
                    className="btn btn-outline-danger retractBtn"
                  >
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </Form>
            </CardBody>
          </div>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default EditJob;
