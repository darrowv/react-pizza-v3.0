import { RootState } from "../../store";

//селектор для корзины
export const cartSelector = (state: RootState) => state.cart;
//селектор для элемента корзины
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);