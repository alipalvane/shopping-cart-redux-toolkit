import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartitems", () => {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      // or can write (state, {payload})
      //becuase: "action.payload" equal to "action:{payload}"
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
    calcTotals: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {},
});

export const { clearCart, removeItem, increase, decrease, calcTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
