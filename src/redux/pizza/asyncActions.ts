import { Pizza, SearchPizzaParams, Pagination } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchPizzas = createAsyncThunk<
  { pizzas: Pizza[]; pagination: Pagination },
  SearchPizzaParams
>('pizzas/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const response = await fetch(
    `https://react-redux-typescript-pizza-backend-j7u3.vercel.app/api/pizzas?page=${currentPage}&${category}&sort=${sortBy}&order=${order}&${search}`,
  );
  const data: { pizzas: Pizza[]; pagination: Pagination } = await response.json();
  return data;
});
