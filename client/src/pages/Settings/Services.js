import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateServices } from "../../redux/Extra/settingsSlice";
import LoadingButton from "../../components/LoadingButton";
import categories from "../../helper/services";

const Services = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const { isSuccess, isError, services } = useSelector(
    (state) => state.settings
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
  }, [isSuccess, isError]);

  useEffect(() => {
    setSelectedSubcategories(services);
  }, [services]);

  const handleCategorySelect = (catIndex) => {
    setSelectedCategory(categories[catIndex]);
  };

  const handleSubcategorySelect = (subcat) => {
    const isValueExists = selectedSubcategories.includes(subcat);

    if (!isValueExists) {
      setSelectedSubcategories([...selectedSubcategories, subcat]);
    }
  };

  const onDelete = (subcat) => {
    const updatedSubcategories = selectedSubcategories.filter(
      (item) => item !== subcat
    );
    setSelectedSubcategories(updatedSubcategories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    dispatch(updateServices({ services: selectedSubcategories }));
  };

  return (
    <React.Fragment>
      <CardBody className="p-4">
        <Form action="#" onSubmit={handleSubmit}>
          <div>
            <Row>
              <Col lg={4}>
                <Card className="job-Categories-box bg-light border-0">
                  <CardBody className="p-4">
                    <ul className="list-unstyled job-Categories-list mb-0">
                      <h6 className="mb-3">Select service</h6>
                      {(categories || []).map((cat, index) => (
                        <li
                          key={index}
                          onClick={() => handleCategorySelect(index)}
                        >
                          <div className="primary-link mainSet">
                            {cat.name}{" "}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="job-Categories-box bg-light border-0">
                  <CardBody className="p-4">
                    <ul className="list-unstyled job-Categories-list mb-0">
                      <h6 className="mb-3">
                        {selectedCategory
                          ? selectedCategory.name
                          : "No service selected"}
                      </h6>
                      {(selectedCategory?.subcategories || []).map(
                        (subcat, index) => (
                          <li
                            key={index}
                            onClick={() => handleSubcategorySelect(subcat)}
                          >
                            <div className="primary-link mainSet">
                              {subcat}{" "}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="job-Categories-box bg-light border-0">
                  <CardBody className="p-4">
                    <ul className="list-unstyled job-Categories-list mb-0">
                      <h6 className="mb-3">
                        {selectedSubcategories.length} services selected
                      </h6>
                      <div className="d-flex flex-wrap align-items-start gap-1">
                        {(selectedSubcategories || []).map((subcat, index) => (
                          <div
                            key={index}
                            className="badge rounded-pill bg-soft-primary subSet"
                          >
                            {subcat}
                            <button
                              onClick={() => onDelete(subcat)}
                              class="choice__button"
                            >
                              Remove item
                            </button>
                          </div>
                        ))}
                      </div>
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="mt-4 text-end">
            <LoadingButton
              disabled={isLoading}
              className={"btn btn-primary"}
              isLoading={isLoading}
              title={"Save"}
            />
          </div>
        </Form>
      </CardBody>
    </React.Fragment>
  );
};

export default Services;
