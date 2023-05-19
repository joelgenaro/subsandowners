import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";

const PaginationForUsers = (props) => {
  const { data, setCurrentPage, currentPage, pagePostLimit } = { ...props };
  return (
    <React.Fragment>
      <Row>
        <Col lg={12} className="mt-4 pt-2">
          <nav aria-label="Page navigation example">
            <div className="pagination job-pagination mb-0 justify-content-center">
              <Pagination
                currentPage={currentPage}
                itemsPerPage={pagePostLimit}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                totalItems={data ? data?.length : 0}
                pageNeighbours={2}
                withProgressBar={true}
              />
            </div>
          </nav>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PaginationForUsers;
