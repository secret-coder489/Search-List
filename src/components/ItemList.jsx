import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectItems,
  selectSearchTerm,
  selectCurrentPage,
  selectItemsPerPage,
} from '../redux/itemsSlice';
import Item from './Item';

const ItemList = () => {
  const items = useSelector(selectItems); // All items
  const searchTerm = useSelector(selectSearchTerm); // Search term
  const currentPage = useSelector(selectCurrentPage); // Current page number
  const itemsPerPage = useSelector(selectItemsPerPage); // Items per page

  // Filter items based on search term (before paginating)
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Paginate the filtered items
  // Use useMemo to memoize the paginated items to avoid recalculating on every render
    const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;  // Calculate the start index of the current page
    const endIndex = startIndex + itemsPerPage;  // Calculate the end index of the current page
    return filteredItems.slice(startIndex, endIndex);  // Slice the filtered items to get only the items for the current page
  }, [filteredItems, currentPage, itemsPerPage]);  // Dependencies: filteredItems, currentPage, and itemsPerPage

  return (
    <div className="item-list">
      {paginatedItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};


// Memoize the ItemList component to prevent unnecessary re-renders
export default React.memo(ItemList);
