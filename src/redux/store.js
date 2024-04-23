import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice.js';

export const store = configureStore({ 
  reducer: { 
    filter: filterSlice, 
  }
});

console.log(store);
