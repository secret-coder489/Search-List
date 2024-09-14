import { createSlice } from '@reduxjs/toolkit'; // Import createSlice from Redux Toolkit

// Define the initial state for the slice
const initialState = {
  items: [], // Array to hold the list of items
  searchTerm: '',  // Search term for filtering items
  currentPage: 1,  // Current page for pagination
  itemsPerPage: 5, // Number of items to display per page
  loading: false,  // Flag indicating if data is being fetched
  error: null, // Error message if fetching fails
};

// Create the items slice using createSlice

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {  // Reducer functions to handle state changes

    // Action to set the search term
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // Action to clear the search term
    clearSearchTerm: (state) => {
      state.searchTerm = '';
    },

    // Action to set the current page for pagination

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

     // Action to indicate that fetching items has started
    fetchItemsStart: (state) => {
      state.loading = true;  // Set loading to true
      state.error = null;  // Clear any existing error
    },

    // Action to handle successful item fetching
    fetchItemsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload; // Update items with the fetched data
    },

    // Action to handle failure in item fetching
    fetchItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Update error with the error message
    },
  },
});


// Export actions to be used in components

export const {
  setSearchTerm,
  setCurrentPage,
  fetchItemsStart,
  clearSearchTerm,
  fetchItemsSuccess,
  fetchItemsFailure,
} = itemsSlice.actions;

// Export selectors to access specific parts of the state

export const selectItems = (state) => state.items.items;
export const selectSearchTerm = (state) => state.items.searchTerm;
export const selectCurrentPage = (state) => state.items.currentPage;
export const selectItemsPerPage = (state) => state.items.itemsPerPage;
export const selectLoading = (state) => state.items.loading;
export const selectError = (state) => state.items.error;

export default itemsSlice.reducer;
