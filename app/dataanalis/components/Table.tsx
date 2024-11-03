import React, { useState, ReactNode } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';

interface TableProps {
  header: string[];
  children: ReactNode[];
  action: boolean;
  itemsPerPage: number | 10;
}

const Table: React.FC<TableProps> = ({
  action,
  header,
  children,
  itemsPerPage
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');

  // Fungsi untuk menghandle perubahan filter
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset halaman ke 1 setiap kali filter berubah
  };

  // Fungsi untuk memfilter data
  const filteredChildren = React.Children.toArray(children).filter((child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      return child.props.children.some((cell: React.ReactNode) =>
        String(cell).toLowerCase().includes(filter.toLowerCase())
      );
    }
    return false;
  });

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

  // Menghitung item yang akan dirender untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengganti halaman
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk membuat array nomor halaman yang ditampilkan
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Filter..."
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="table text-slate-600">
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
            {action && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems}
        </tbody>
      </table>
      <div className="pagination flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-300 rounded"
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-300 rounded"
        >
          Previous
        </button>
        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-300 rounded"
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-300 rounded"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Table;
