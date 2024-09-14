import { configureStore } from '@reduxjs/toolkit';  // Import configureStore from Redux Toolkit
import itemsReducer from './itemsSlice';  // Import the reducer for the items slice


// Configure the Redux store
export const store = configureStore({
  reducer: {
    items: itemsReducer, // This key ('items') maps to the 'items' slice in the state
  },
});
