export type CartItem = {
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  id: string;
  count: number;
};

export interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
}