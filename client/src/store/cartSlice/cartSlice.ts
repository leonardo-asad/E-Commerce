import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartProducts } from "../../apis/cart";
import { RootState } from "../store";
import * as Types from '../../types/types';

interface InitialState {
  isLoadingCartProducts: boolean
  failedToLoadCartProducts: boolean
  products: Types.CartProducts
}

export const loadCartProducts = createAsyncThunk(
  '/cart/loadProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartProducts();
      if (response.status === 200) {
        const data = await response.data;
        return data;
      }
      const data = await response.data;
      rejectWithValue(data);
    } catch (err) {
      throw err;
    }
  }
);

const initialState: InitialState = {
  isLoadingCartProducts: true,
  failedToLoadCartProducts: false,
  products: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadCartProducts.pending, (state, action) => {
        state.isLoadingCartProducts = true;
        state.failedToLoadCartProducts = false;
      })
      .addCase(loadCartProducts.rejected, (state, action) => {
        state.isLoadingCartProducts = false;
        state.failedToLoadCartProducts = true;
      })
      .addCase(loadCartProducts.fulfilled, (state, action) => {
        state.isLoadingCartProducts = false;
        state.failedToLoadCartProducts = false;
        state.products = action.payload;
      })
  }
});

export const selectCartProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
