import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItems = state.cartItems.find((item) => item.id === payload.id);
      cartItems.amount = cartItems.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItems = state.cartItems.find((item) => item.id === payload.id);
      cartItems.amount = cartItems.amount - 1;
    },
  },
});

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;