import React, { useState, useEffect } from "react";
import { Col, Row, Card, Input, Form, CardBody, Label } from "reactstrap";
import DropZone from "../../../helper/fileUploader";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../../config/firebase";

const RightSideContent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.project);

  const [project, setProject] = useState({
    name: "",
    location: "",
    note: "",
    deadline: "",
    budget: "",
    attachments: [],
    materialCategory: "",
    materialStyle: "",
    materialColor: "",
    materialHeight: "",
    removalCategory: "",
    removalAmount: "",
    identifier: "owner",
  });
  const [files, setFiles] = useState([]);
  const [isShowRadioForRemoval, setIsShowRadioForRemoval] = useState("no");
  const [styleOptions, setStyleOptions] = useState([]);
  const [isFileUploadLoading, setIsFileUploadLoading] = useState(false);

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("Project Registered Successfully");
      // history.push("/joblist");
    }
    dispatch(projectReset());
  }, [isSuccess, isError, message, history, dispatch]);

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
    setFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // File upload to Firebase
    if (files.length > 0) {
      setIsFileUploadLoading(true);
      let tempFiles = [];

      // Upload files to Firebase
      await Promise.all(
        files.map(async (item) => {
          const encodedName =
            item.preview.split("/")[3] + "." + item.name.split(".").pop();

          const fileRef = ref(
            storage,
            "scheduleasub/attachmentsForProject/" + encodedName
          );

          await uploadBytesResumable(fileRef, item)
            .then((snapshot) => {
              getDownloadURL(snapshot.ref).then(async (url) => {
                tempFiles.push({ name: item.name, path: url });
              });
            })
            .catch((error) => {
              toast.error(error);
            });
        })
      );

      setProject((data) => ({ ...data, attachments: tempFiles }));

      if (project.attachments.length > 1) {
        setIsFileUploadLoading(false);
      }
    }
    // End fileUpload to Firebase

    if (isFileUploadLoading == false) {
      dispatch(createProject(project));
    }
    return true;
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
                      <Label htmlFor="name" className="form-label">
                        Choose a name for your project
                      </Label>
                      <Input
                        className="form-control"
                        placeholder=""
                        type="text"
                        required
                        defaultValue={project.name}
                        onChange={handleChange}
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
                        required
                        value={project.note}
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
                      <DropZone parentAttachments={setAttachments} />
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
