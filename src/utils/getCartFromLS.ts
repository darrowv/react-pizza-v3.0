import { CartItem } from "../redux/slices/cart/types";

export const getCartFromLS = () => {
  const cart = localStorage.getItem("cart");
  const data = cart ? JSON.parse(cart) : [];

  const totalPrice = data.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.count,
    0
  );

  return {
    data: data as CartItem[],
    totalPrice: totalPrice as number,
  };
};
