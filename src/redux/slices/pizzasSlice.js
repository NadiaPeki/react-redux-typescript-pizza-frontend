import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const response = await fetch(
    `https://react-redux-typescript-pizza-backend-j7u3.vercel.app/api/pizzas?page=${currentPage}&${category}&sort=${sortBy}&order=${order}&${search}`,
  );
  const data = await response.json();
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
  pagination: {
    totalPages: 1,
    totalCount: 0,
  },
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPagination(state, action) {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.pizzas;
        state.status = 'success';
        state.pagination.totalCount = action.payload.pagination.totalCount;
        state.pagination.totalPages = Math.ceil(action.payload.pagination.totalCount / 6);
      })

      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setPagination } = pizzasSlice.actions;

export default pizzasSlice.reducer;
