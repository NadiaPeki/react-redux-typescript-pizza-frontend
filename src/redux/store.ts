import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice.ts';
import cartSlice from './slices/cartSlice.ts';
import pizzasSlice from './slices/pizzasSlice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
