import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Pagination from "react-js-pagination";
import { candidateListService } from "../../services/Candidate/candidateList";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";

const PaginationForSub = (props) => {
  const { size, setData, paginator, setPaginator } = { ...props };

  const fetchData = (pageNumber) => {
    return candidateListService
      .getData(pageNumber, size)
      .then((res) => {
        setData(res.data.data.itemsList);
        setPaginator(res.data.data.paginator);
      })
      .catch((err) => {
        NotificationManager.warning(
          err?.response?.data?.message ? err?.response?.data?.message : "error"
        );
      });
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
