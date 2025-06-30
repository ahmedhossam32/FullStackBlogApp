import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange, scrollRef }) {
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    setTimeout(() => {
      if (scrollRef?.current) {
        const offset = scrollRef.current.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-10 font-serif text-sm">
      {/* Prev Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:bg-black disabled:opacity-40 px-4 py-2 border border-gray-400 rounded-none text-gray-600 hover:text-white transition"
      >
        Prev
      </button>

      {/* Page Buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-4 py-2 border border-gray-400 transition rounded-none ${
            currentPage === p
              ? 'bg-black text-white'
              : 'text-gray-600 hover:bg-black hover:text-white'
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:bg-black disabled:opacity-40 px-4 py-2 border border-gray-400 rounded-none text-gray-600 hover:text-white transition"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
