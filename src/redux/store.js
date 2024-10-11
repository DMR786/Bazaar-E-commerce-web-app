// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import your slice

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Add reducers here
  },
});