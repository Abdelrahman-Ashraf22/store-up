import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  products: [],
  fav: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (product) {
        product.count = action.payload.count;
        toast(`🛒${product.title} is already in your cart!`);
      } else {
        state.products.push(action.payload);
        toast.success(`${action.payload.title} has been added to your cart!`);
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    addToFav: (state, action) => {
      const fav = state.fav.find((item) => item.id === action.payload.id);
      !fav && state.fav.push(action.payload);
    },
    removeFromFav: (state, action) => {
      state.fav = state.fav.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart, resetCart, addToFav, removeFromFav } =
  cartSlice.actions;

export default cartSlice.reducer;
