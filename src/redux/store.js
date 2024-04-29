import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice.js';
import cartSlice from './slices/cartSlice.js';
import pizzasSlice from './slices/pizzasSlice.js';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});
