import React from "react";
import PropTypes from "prop-types";

const Pagination = props => {
  const { count, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount === 1) return null;
  const pages = new Array(pageCount).fill(0); // [0,0,0]
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page, index) => {
          const pageIndex = index + 1;
          return (
            <li
              className={
                pageIndex === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
              <a
                className="page-link"
                style={{ cursor: "pointer" }}
                onClick={() => onPageChange(pageIndex)}
              >
                {pageIndex}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func
};

export default Pagination;
