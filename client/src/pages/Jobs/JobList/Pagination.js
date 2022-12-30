import React, { memo, useEffect } from "react";
import { Col, Row } from "reactstrap";
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../../redux/jobListSlice";

const PaginationForSub = () => {
  const dispatch = useDispatch();
  const { size, paginator, filterOptions } = useSelector(
    (state) => state.jobList
  );

  // Initial Data
  const fetchData = (pageNumber) => {
    dispatch(
      getData({ page: pageNumber, size: size, filterOptions: filterOptions })
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12} className="mt-4 pt-2">
          <div className="pagination job-pagination mb-0 justify-content-center">
            <Pagination
              activePage={paginator?.currentPage ? paginator?.currentPage : 0}
              itemsCountPerPage={paginator?.perPage ? paginator?.perPage : 0}
              totalItemsCount={paginator?.itemCount ? paginator?.itemCount : 0}
              onChange={(pageNumber) => {
                fetchData(pageNumber);
              }}
              pageRangeDisplayed={5}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default memo(PaginationForSub);
