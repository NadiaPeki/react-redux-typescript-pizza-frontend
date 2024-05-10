import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/filter/slice.ts';
import cart from '../redux/cart/slice.ts';
import pizza from '../redux/pizza/slice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filter,
    cart: cart,
    pizzas: pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
