import React from "react";
import Link from "next/link";
import arrayNumbers from "../utils/arrayNumbers";

const Pagination = ({ totalPages, currentPage, lastPage, href, as }) => {
  let start = 1;
  let to = currentPage + 2;
  if (1 === currentPage) {
    to = currentPage + 4;
  }
  if (2 === currentPage) {
    to = currentPage + 3;
  }
  if (![1, 2].includes(currentPage)) {
    start = currentPage - 2;
  }

  if (totalPages === currentPage) {
    to = totalPages;
    start = currentPage - 5;
  }
  if (totalPages - 1 === currentPage) {
    to = totalPages;
    start = currentPage - 3;
  }
  if (totalPages - 2 === currentPage) {
    to = totalPages;
    start = currentPage - 2;
  }

  if (totalPages - 3 === currentPage) {
    to = totalPages - 1;
    start = currentPage - 2;
  }
  if (totalPages - 4 === currentPage) {
    to = totalPages - 2;
    start = currentPage - 2;
  }
  const pagesList = arrayNumbers(
    start < 1 ? 1 : start,
    to > totalPages ? totalPages : to
  );
  return (
    <div className="d-flex justify-content-center w-100 mt-4">
      <nav aria-label="Pagination">
        <ul className="pagination">
          {currentPage !== 1 && (
            <li className="page-item">
              <Link href={href} as={as(1)}>
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </Link>
            </li>
          )}
          {pagesList.map(number => {
            return (
              <li
                key={number}
                className={`page-item ${currentPage === number && "active"}`}
              >
                <Link href={href} as={as(number)}>
                  <a className="page-link">{number}</a>
                </Link>
              </li>
            );
          })}
          {!lastPage && (
            <li className="page-item">
              <Link href={href} as={as(totalPages)}>
                <a className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
