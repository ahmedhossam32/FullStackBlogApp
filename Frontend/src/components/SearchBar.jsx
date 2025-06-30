import React from 'react';

function SearchBar({ searchTerm, setSearchTerm, containerRef, placeholder = "Search blogs..." }) {
  return (
    <div ref={containerRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent mb-6 px-3 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-black w-full font-serif font-medium text-black text-sm placeholder-gray-500"
      />
    </div>
  );
}

export default SearchBar;
