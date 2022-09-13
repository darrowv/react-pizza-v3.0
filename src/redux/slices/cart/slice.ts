import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const { data, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  items: data,
  totalPrice: totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice += action.payload.price;
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count++;

        state.totalPrice += findItem.price;
      }
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count;
      }

      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, plusItem, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
