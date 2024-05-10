export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};
export interface CartSliceState {
  categoryId: number;
  totalPrice: number;
  items: CartItem[];
}
