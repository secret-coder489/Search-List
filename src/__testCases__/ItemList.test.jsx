import React from 'react';
import { render, screen } from '@testing-library/react'; // Import testing utilities from React Testing Library
import { Provider } from 'react-redux'; // Import Provider to wrap the component with Redux store
import { configureStore } from '@reduxjs/toolkit'; // Import function to configure the store
import itemsReducer from '../redux/itemsSlice';  
import ItemList from '../components/ItemList'; 

// Mock store setup to simulate Redux state in tests
const mockStore = (preloadedState) => {
  return configureStore({
    reducer: { items: itemsReducer },  // Use actual reducer in the store
    preloadedState, // Preload the store with a specific state
  });
};

describe('ItemList Component Tests', () => {

  //  Render all items in the list
  test('renders all items', () => {
    // Define the initial state with items and pagination
    const initialState = {
      items: {
        items: [
          { id: 1, name: 'Bus' },
          { id: 2, name: 'Car' },
        ],
        searchTerm: '', // No search term (show all items)
        currentPage: 1, // First page
        itemsPerPage: 5, // Show 5 items per page
        loading: false, // No loading state
        error: null, // No error
      }
    };

    // Render the Item List component wrapped with the Redux provider
    render(
      <Provider store={mockStore(initialState)}>
        <ItemList />
      </Provider>
    );

    // Check that both items are rendered
    expect(screen.getByText(/Bus/i)).toBeInTheDocument();
    expect(screen.getByText(/Car/i)).toBeInTheDocument();
  });

  // Filters items based on search term
  test('filters items based on search term', () => {
    const initialState = {
      items: {
        items: [
          { id: 1, name: 'Bus' },
          { id: 2, name: 'Car' },
        ],
        searchTerm: 'Car', // Search term is 'Car' (should only show 'Car')
        currentPage: 1,
        itemsPerPage: 5,
        loading: false,
        error: null,
      }
    };

    // Render the Item List component
    render(
      <Provider store={mockStore(initialState)}>
        <ItemList />
      </Provider>
    );

    // 'Bus' should not be rendered, and 'Car' should be rendered
    expect(screen.queryByText(/Bus/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Car/i)).toBeInTheDocument();
  });

  // Paginates items correctly
  test('paginates items correctly', () => {
    const initialState = {
      items: {
        items: [
          { id: 1, name: 'Bus' },
          { id: 2, name: 'Car' },
          { id: 3, name: 'Bike' },
          { id: 4, name: 'Scooty' },
          { id: 5, name: 'Cycle' },
        ],
        searchTerm: '', // No search term (show all items)
        currentPage: 1, // First page
        itemsPerPage: 3, // Show 3 items per page
        loading: false,
        error: null,
      }
    };

    // Render the ItemList component
    render(
      <Provider store={mockStore(initialState)}>
        <ItemList />
      </Provider>
    );

    // Only the first 3 items should be rendered on page 1
    expect(screen.getByText(/Bus/i)).toBeInTheDocument();
    expect(screen.getByText(/Car/i)).toBeInTheDocument();
    expect(screen.getByText(/Bike/i)).toBeInTheDocument();
    // These items are on the next page, so they should not be rendered
    expect(screen.queryByText(/Scooty/i)).not.toBeInTheDocument();
  });

  // Memoization works as expected (rerender with updated state)
  test('memoizes filtered items', () => {
    const initialState = {
      items: {
        items: [
          { id: 1, name: 'Bus' },
          { id: 2, name: 'Car' },
        ],
        searchTerm: 'Bus', // Initial search term is 'Bus'
        currentPage: 1,
        itemsPerPage: 5,
        loading: false,
        error: null,
      }
    };

    // Render the ItemList component initially with 'Bus' in the search term
    const { rerender } = render(
      <Provider store={mockStore(initialState)}>
        <ItemList />
      </Provider>
    );

    // 'Bus' should be rendered, 'Car' should not
    expect(screen.getByText(/Bus/i)).toBeInTheDocument();
    expect(screen.queryByText(/Car/i)).not.toBeInTheDocument();

    // Update the state with a new search term ('Car')
    const updatedState = {
      items: {
        items: [
          { id: 1, name: 'Bus' },
          { id: 2, name: 'Car' },
        ],
        searchTerm: 'Car', // Updated search term to 'Car'
        currentPage: 1,
        itemsPerPage: 5,
        loading: false,
        error: null,
      }
    };

    // Rerender the ItemList component with the new state
    rerender(
      <Provider store={mockStore(updatedState)}>
        <ItemList />
      </Provider>
    );

    // Now 'Bus' should not be rendered, and 'Car' should be rendered
    expect(screen.queryByText(/Bus/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Car/i)).toBeInTheDocument();
  });
});
