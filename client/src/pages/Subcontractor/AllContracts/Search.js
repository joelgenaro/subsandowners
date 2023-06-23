import React, { useState } from "react";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { filter } from "../../../redux/Subcontractor/allContractsSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleText = (e) => {
    setText(e.target.value);
  };
  const submit = () => {
    dispatch(filter({ filter: text }));
  };

  return (
    <React.Fragment>
      <div className="p-4 border-bottom filter">
        <h5 className="mb-0">Active Contracts</h5>

        <div className="searchInput">
          <div className="filter-search-form  mt-3 mt-md-0">
            <i className="uil uil-briefcase-alt"></i>
            <Input
              onChange={handleText}
              type="search"
              defaultValue={text}
              className="form-control filler-job-input-box"
              id="exampleFormControlInput1"
              placeholder="Search"
            />
          </div>
          <div className="searchBtn">
            <button
              className="btn btn-primary submit-btn w-100 h-100"
              onClick={submit}
              type="submit"
            >
              <i className="uil uil-search me-1"></i>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;
