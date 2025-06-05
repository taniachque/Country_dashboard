import React from 'react';
import './Pagination.css';

const Pagination = ({ totalCountries, paginate, currentPage, totalPages }) => {
  const pageNumbers = [];
  const pageRange = 2; 

  let startPage, endPage;
  if (totalPages <= pageRange * 2 + 1) { 
    startPage = 1;
    endPage = totalPages;
  } else { 
    if (currentPage <= pageRange + 1) { 
      startPage = 1;
      endPage = pageRange * 2 + 1;
    } else if (currentPage + pageRange >= totalPages) { 
      startPage = totalPages - pageRange * 2;
      endPage = totalPages;
    } else { 
      startPage = currentPage - pageRange;
      endPage = currentPage + pageRange;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>

      <ul className="pagination-list">
        {startPage > 1 && (
          <>
            <li className="page-item">
              <a onClick={() => paginate(1)} href="#!" className="page-link">1</a>
            </li>
            {startPage > 2 && <li className="page-item ellipsis">...</li>}
          </>
        )}

        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="#!"
              className={`page-link ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </a>
          </li>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <li className="page-item ellipsis">...</li>}
            <li className="page-item">
              <a onClick={() => paginate(totalPages)} href="#!" className="page-link">{totalPages}</a>
            </li>
          </>
        )}
      </ul>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;