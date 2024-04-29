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
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
