import React from "react";

const Pagination = props => {
  const { count, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage)
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount === 1) return null;
  const pages = new Array(pageCount).fill(0); // [0,0,0]
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page, index) => (
          <li className={index+1 === currentPage ? "page-item active" : "page-item"} key={index}>
            <a
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
