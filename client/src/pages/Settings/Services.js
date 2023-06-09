import React, { useState, useEffect } from "react";
import { Col, Row, CardBody } from "reactstrap";
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
                <div>
                  <p>Select service</p>
                  <ul>
                    {categories.map((cat, index) => (
                      <li
                        key={cat.name}
                        onClick={() => handleCategorySelect(index)}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col lg={4}>
                {selectedCategory ? (
                  <div>
                    <p>{selectedCategory.name} Subcategories</p>
                    <ul>
                      {selectedCategory.subcategories.map((subcat) => (
                        <li
                          key={subcat}
                          onClick={() => handleSubcategorySelect(subcat)}
                        >
                          {subcat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p> No service selected</p>
                  </div>
                )}
              </Col>
              <Col lg={4}>
                <div>
                  <p>{selectedSubcategories.length} services selected</p>
                  <ul>
                    {selectedSubcategories.map((subcat) => (
                      <li onClick={() => onDelete(subcat)} key={subcat}>
                        {subcat}
                      </li>
                    ))}
                  </ul>
                </div>
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
