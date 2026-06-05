import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

import "../styles/dashboard.css";

function SearchBar({
  onSearch,
  loading = false,
}) {
  const [keyword, setKeyword] =
    useState("");

  const handleSearch = () => {
    const value = keyword.trim();

    if (!value) return;

    onSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearInput = () => {
    setKeyword("");
  };

  return (
    <div className="search-wrapper">
      <div className="search-box">
        <FaSearch className="search-box-icon" />

        <input
          type="text"
          placeholder="Enter a brand name (Tesla, Nike, Apple...)"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />

        {keyword && (
          <FaTimes
            className="clear-search"
            onClick={clearInput}
          />
        )}
      </div>

      <button
        className="analyze-btn"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Brand"}
      </button>
    </div>
  );
}

export default SearchBar;