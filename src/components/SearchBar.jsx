import React from 'react';
import { useDispatch, useSelector } from 'react-redux';  // Import hooks from React Redux
import { setSearchTerm, setCurrentPage, clearSearchTerm, selectSearchTerm } from '../redux/itemsSlice';

const SearchBar = () => {
  // dispatch function from Redux
  const dispatch = useDispatch();

  // Access the current search term from the Redux store
  const searchTerm = useSelector(selectSearchTerm);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));  // Dispatch action to update search term
    dispatch(setCurrentPage(1)); // Reset to page 1 when search changes
  };

  const handleClearSearch = () => {
    dispatch(clearSearchTerm()); // Dispatch action to clear search term
    dispatch(setCurrentPage(1)); // Reset to page 1 when clearing search
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Item"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleClearSearch}>Clear Search</button>

    </div>
  );
};

export default SearchBar;
