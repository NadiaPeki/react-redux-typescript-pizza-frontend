import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Sort } from './filterSlice';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

type Pagination = {
  totalPages: number;
  totalCount: number;
  next?: {
    page: number;
    url: string;
  } | null;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
  pagination: Pagination;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
  pagination: {
    totalPages: 1,
    totalCount: 0,
  },
};
export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};
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

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPagination(state, action) {
      state.pagination = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.pizzas;
      state.status = Status.SUCCESS;
      state.pagination.totalCount = action.payload.pagination.totalCount;
      state.pagination.totalPages = Math.ceil(action.payload.pagination.totalCount / 6);
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setPagination, setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
