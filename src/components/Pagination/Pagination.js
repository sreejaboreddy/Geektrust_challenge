// Pagination.js
import React from 'react';
import './Pagination.css';

/**
 * Pagination Component
 * 
 * @param {number} totalUsers
 *    The total number of users in the table.
 * 
 * @param {number} usersPerPage
 *    The number of users to display per page.
 * 
 * @param {number} currentPage
 *    The current active page number.
 * 
 * @param {function} onPageChange
 *    The function to be called when a new page is selected by the user.
 * 
 * @returns {JSX.Element}
 *    Returns a JSX element representing the Pagination component.
 */

const Pagination = ({ totalUsers, usersPerPage, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className='first-page'
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}>
        {"<<"}
      </button>
      <button
        className='prev-page'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        {"<"}
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
      <button
        className='next-page'
        disabled={currentPage === pageNumbers.length}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </button>
      <button
        className='last-page'
        disabled={currentPage === pageNumbers.length}
        onClick={() => onPageChange(pageNumbers.length)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
