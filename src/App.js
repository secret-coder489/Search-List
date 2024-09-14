import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Import Provider
import axios from 'axios'; // Import Axios
import { store } from './redux/store'; // Import the store
import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  selectLoading,
  selectError,
} from './redux/itemsSlice';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const fetchItems = async () => {
      // Dispatch action to start fetching items
      dispatch(fetchItemsStart());

      try {
        // Using Axios to fetch the items
        const response = await axios.get('https://run.mocky.io/v3/30dc1bfc-018d-478b-a94d-f3b42755091e');
        const items = response.data.map((user) => ({
          id: user.id,
          name: user.name,
        }));

        // Dispatch action to update store with fetched items
        dispatch(fetchItemsSuccess(items));
      } catch (error) {
        // Dispatch action to update store with the error
        dispatch(fetchItemsFailure(error.toString()));
      }
    };

    // Call the fetch function
    fetchItems();
  }, [dispatch]);

  return (
    <div className="App">
      <h1>ITEM LIST WITH PAGINATION</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <SearchBar />
          <ItemList />
          <Pagination />
        </>
      )}
    </div>
  );
}

export default function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

