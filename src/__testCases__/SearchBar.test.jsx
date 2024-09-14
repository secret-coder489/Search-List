import { render, screen, fireEvent } from '@testing-library/react'; // Import utilities from React Testing Library
import { Provider } from 'react-redux'; // Import Provider to wrap the component with Redux store
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore to create mock store
import itemsReducer from '../redux/itemsSlice'; // Import items slice reducer
import SearchBar from '../components/SearchBar'; // Import the SearchBar component
import { setSearchTerm, setCurrentPage, clearSearchTerm } from '../redux/itemsSlice'; // Import actions

// Create a mock store to intercept dispatched actions
const mockStore = configureStore({ reducer: { items: itemsReducer } });

describe('SearchBar Component', () => {
  test('renders search input and clear button', () => {
    render(
      <Provider store={mockStore}>
        <SearchBar />
      </Provider>
    );

    // Assert that the search input and clear button are rendered
    const inputElement = screen.getByPlaceholderText(/Search Item/i);
    const buttonElement = screen.getByText(/Clear Search/i);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('updates search term and dispatches actions', () => {
    const store = mockStore;

    // Mock dispatch to spy on dispatched actions
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    // Simulate changing the search input value
    fireEvent.change(screen.getByPlaceholderText(/Search Item/i), { target: { value: 'Apple' } });

    // Check if the correct actions are dispatched
    expect(dispatch).toHaveBeenCalledWith(setSearchTerm('Apple'));
    expect(dispatch).toHaveBeenCalledWith(setCurrentPage(1));
  });

  test('clears search term and dispatches actions', () => {
    const store = mockStore;

    // Mock dispatch to spy on dispatched actions
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    // Simulate clicking the clear search button
    fireEvent.click(screen.getByText(/Clear Search/i));

    // Check if the correct actions are dispatched
    expect(dispatch).toHaveBeenCalledWith(clearSearchTerm());
    expect(dispatch).toHaveBeenCalledWith(setCurrentPage(1));
  });
  
});

