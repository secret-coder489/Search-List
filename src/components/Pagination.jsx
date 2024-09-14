import React from 'react';
import { useSelector, useDispatch } from 'react-redux';   // Import hooks from React Redux
import { setCurrentPage, selectItems, selectItemsPerPage } from '../redux/itemsSlice'; // Import actions and selectors from the items slice

const Pagination = () => {

  // dispatch function from Redux
  const dispatch = useDispatch(); 
   // Access the list of items and items per page from the Redux store
  const items = useSelector(selectItems);   // Selector for array items
  const itemsPerPage = useSelector(selectItemsPerPage);  // Selector for number of items per page

  // Calculate total number of pages required
  const totalPages = Math.ceil(items.length / itemsPerPage);   // Divide the total number of items by items per page and round up

   // To Handle function to dispatch the action for changing the current page
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));  // Dispatch the action to update the current page
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className="page-btn"
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

// Memoize the Pagination component to prevent unnecessary re-renders
export default React.memo(Pagination);
