import { CartItem } from '../redux/cart/types';

export const totalCount = (items: CartItem[]) => {
  return items.reduce((sum, item) => {
    return item.count + sum;
  }, 0);
};
