// Pagination.js
import React, { useEffect, useState } from "react";

const Pagination = ({
  totalItems,
  rowsPerPage,
  onPageChange,
  onrowsPerPageChange,
}) => {
  //   const totalPages = Math.ceil(totalItems / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesArray, setPagesArray] = useState([1]);
  useEffect(() => {
    let pages = Math.ceil(totalItems / rowsPerPage);
    setTotalPages(pages);
  }, [totalItems, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const handlerowsPerPageChange = (e) => {
    const newrowsPerPage = parseInt(e.target.value, 10);
    onrowsPerPageChange(newrowsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  //   const generatePageNumbers = () => {
  //     const pageNumbers = [];
  //     const maxVisiblePages = 5; // Adjust this value based on your preference

  //     if (totalPages <= maxVisiblePages) {
  //       for (let i = 1; i <= totalPages; i++) {
  //         pageNumbers.push(i);
  //       }
  //     } else {
  //       const startPage = Math.max(
  //         1,
  //         currentPage - Math.floor(maxVisiblePages / 2)
  //       );
  //       const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  //       for (let i = startPage; i <= endPage; i++) {
  //         pageNumbers.push(i);
  //       }
  //     }

  //     return pageNumbers;
  //   };
  useEffect(() => {
    let newArray = [];
    for (let i = 1; i <= totalPages; i++) {
      newArray.push(i);
    }
    setPagesArray(newArray);
  }, [totalPages]);
  return (
    <div className="flex items-center justify-center p-4 bg-gray-100">
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={handlerowsPerPageChange}
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="flex space-x-4">
        {pagesArray.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`bg-blue-500 text-white px-3 py-1 rounded ${
              currentPage === pageNumber ? "bg-blue-700" : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
