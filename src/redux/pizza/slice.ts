import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { PizzaSliceState, Status } from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
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
