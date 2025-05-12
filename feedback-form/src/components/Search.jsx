import React from "react";

function Search({ search, setSearch }) {
  return (
    <input
      type='text'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder='Search by name'
      style={{ height: "30px", marginBottom: "20px" }}
    />
  );
}

export default Search;
