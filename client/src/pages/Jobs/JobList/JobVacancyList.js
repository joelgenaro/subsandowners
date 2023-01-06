import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getData, jobListReset, setSize } from "../../../redux/jobListSlice";
import JobCard from "./JobCard";

const JobVacancyList = () => {
  const dispatch = useDispatch();
  const {
    isSuccess,
    isError,
    isLoading,
    message,
    size,
    paginator,
    data,
    filterOptions,
  } = useSelector((state) => state.jobList);

  // Get Data
  useEffect(() => {
    dispatch(getData({ page: 1, size: size, filterOptions: filterOptions }));
  }, [size, filterOptions, dispatch]);

  // Message
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
    }
    dispatch(jobListReset());
  }, [isSuccess, isError, message, dispatch]);

  // Get Size
  const itemsPerPage = (e) => {
    dispatch(setSize(e.target.value));
  };

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col lg={8}>
          <div className="mb-3 mb-lg-0">
            {paginator ? (
              <h6 className="fs-16 mb-0">
                {" "}
                Showing {paginator.slNo} –{" "}
                {paginator.currentPage * paginator.perPage > paginator.itemCount
                  ? paginator.itemCount
                  : paginator.perPage * paginator.currentPage}{" "}
                of {paginator.itemCount} results{" "}
              </h6>
            ) : (
              ""
            )}
          </div>
        </Col>

        <Col lg={4}>
          <div className="candidate-list-widgets">
            <Row>
              <Col lg={6}></Col>
              <Col lg={6}>
                <div className="selection-widget mt-2 mt-lg-0 ">
                  <select
                    className="form-select"
                    data-trigger
                    name="choices-candidate-page"
                    id="choices-candidate-page"
                    aria-label="Jobs Per Page"
                    onChange={itemsPerPage}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div>
        {!isLoading ? (
          data ? (
            data.map((project, key) => <JobCard key={key} project={project} />)
          ) : (
            "No results matched your search"
          )
        ) : (
          <div className="spinner-border text-primary m-1" role="status"></div>
        )}
      </div>
    </React.Fragment>
  );
};

export default JobVacancyList;
