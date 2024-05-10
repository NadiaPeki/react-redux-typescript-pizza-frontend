import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
