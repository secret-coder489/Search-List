import React from 'react';

const Item = ({ item }) => {
  return (
    <div className="item">
      {item.name}
    </div>
  );
};

// Export the Item component wrapped in React.memo to prevent unnecessary re-renders
export default React.memo(Item);