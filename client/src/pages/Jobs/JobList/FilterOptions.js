import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Input, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { setFilterOptions } from "../../../redux/jobSlice";

const FilterOptions = () => {
  const dispatch = useDispatch();
  const { filterOptions } = useSelector((state) => state.job);

  // Parent state
  const [toggleFirst, setToggleFirst] = useState(true);
  const [toggleSecond, setToggleSecond] = useState(true);
  const [toggleThird, setToggleThird] = useState(true);
  const [toggleFourth, setToggleFourth] = useState(true);

  useEffect(() => {
    // Google map Input
    const initAutocomplete = () => {
      let input = document.getElementById("pac-input");
      let searchBox = new window.google.maps.places.SearchBox(input);

      searchBox.addListener("places_changed", function () {
        dispatch(
          setFilterOptions({
            ...filterOptions,
            location: document.getElementById("pac-input").value,
          })
        );
      });
    };
    initAutocomplete();
  }, [dispatch, filterOptions]);

  const filterChange = (e) => {
    e.preventDefault();

    dispatch(
      setFilterOptions({ ...filterOptions, [e.target.name]: e.target.value })
    );
  };

  // Material category
  const categoryChange = (e) => {
    let categories = filterOptions.category;

    if (e.target.checked) {
      categories = [...categories, e.target.value];
    } else {
      // remove from list
      categories = categories.filter((value) => value !== e.target.value);
    }

    dispatch(setFilterOptions({ ...filterOptions, category: categories }));
  };

  // Removal
  const removalChange = (e) => {
    dispatch(setFilterOptions({ ...filterOptions, isRemoval: e.target.value }));
  };

  const checkNullForLocation = (e) => {
    if (e.target.value === "") {
      dispatch(
        setFilterOptions({
          ...filterOptions,
          location: "",
        })
      );
    }
  };

  return (
    <React.Fragment>
      <Col lg={3}>
        <div className="side-bar mt-5 mt-lg-0">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="locationOne">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleFirst(!toggleFirst);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Project location
                </Button>
              </h2>
              <Collapse isOpen={toggleFirst}>
                <div className="accordion-body">
                  <div className="side-title">
                    <div className="mb-3">
                      <Input
                        className="form-control"
                        name="location"
                        required
                        onChange={checkNullForLocation}
                        defaultValue={filterOptions.location}
                        id="pac-input"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="accordion-item mt-4">
              <h2 className="accordion-header" id="experienceOne">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleSecond(!toggleSecond);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Price
                </Button>
              </h2>
              <Collapse isOpen={toggleSecond}>
                <div className="accordion-body">
                  <div className="side-title">
                    <div className=" mt-2">
                      <label htmlFor="minPrice" className="form-label">
                        $ Min
                      </label>
                      <Input
                        type="number"
                        defaultValue={filterOptions.minPrice}
                        onChange={filterChange}
                        required
                        className="form-control"
                        id="minPrice"
                        placeholder="0"
                        name="minPrice"
                        min={1}
                      />
                    </div>
                    <div className=" mt-2">
                      <label htmlFor="maxPrice" className="form-label">
                        $ Max
                      </label>
                      <Input
                        type="number"
                        defaultValue={filterOptions.maxPrice}
                        onChange={filterChange}
                        required
                        className="form-control"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="1500+"
                        min={1}
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="accordion-item mt-3">
              <h2 className="accordion-header" id="jobType">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleThird(!toggleThird);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  Material Category
                </Button>
              </h2>
              <Collapse isOpen={toggleThird}>
                <div className="accordion-body">
                  <div className="side-title form-check-all">
                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={categoryChange}
                        id="aluminum"
                        name="aluminum"
                        value="Aluminum"
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="aluminum"
                      >
                        Aluminum
                      </Label>
                    </div>

                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={categoryChange}
                        name="cedar"
                        value="Cedar"
                        id="cedar"
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="cedar"
                      >
                        Cedar
                      </Label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={categoryChange}
                        name="chainLink"
                        value="Chain Link"
                        id="chainLink"
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="chainLink"
                      >
                        Chain Link
                      </Label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={categoryChange}
                        name="preasureTreated"
                        value="Preasure Treated"
                        id="preasureTreated"
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="preasureTreated"
                      >
                        Preasure Treated
                      </Label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        onChange={categoryChange}
                        name="vinyl"
                        value="Vinyl"
                        id="vinyl"
                      />
                      <Label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="vinyl"
                      >
                        Vinyl
                      </Label>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="accordion-item mt-3">
              <h2 className="accordion-header" id="datePosted">
                <Button
                  className="accordion-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggleFourth(!toggleFourth);
                  }}
                  role="button"
                  id="collapseExample"
                >
                  There are removals
                </Button>
              </h2>
              <Collapse isOpen={toggleFourth}>
                <div className="accordion-body">
                  <div className="side-title" on>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={removalChange}
                        checked={filterOptions.isRemoval === "removalAll"}
                        name="removalAll"
                        id="removalAll"
                        value="removalAll"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="removalAll"
                      >
                        All
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        onChange={removalChange}
                        checked={filterOptions.isRemoval === "removalYes"}
                        name="removalYes"
                        id="removalYes"
                        value="removalYes"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="removalYes"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <Input
                        className="form-check-input"
                        type="radio"
                        onChange={removalChange}
                        checked={filterOptions.isRemoval === "removalNo"}
                        name="removalNo"
                        value="removalNo"
                        id="removalNo"
                      />
                      <label
                        className="form-check-label ms-2 text-muted"
                        htmlFor="removalNo"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default FilterOptions;
