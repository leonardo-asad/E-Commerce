import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../apis/product";
import { RootState } from "../store";
import * as Types from '../../types/types';

interface InitialState {
  isLoadingProducts: boolean,
  failedToLoadProducts: boolean,
  products: Types.Products
}

export const loadProducts = createAsyncThunk(
  'product/products',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProducts();
      if (response.status === 200) {
        const data = await response.data;
        return data;
      }
      const data = await response.data;
      return rejectWithValue(data);
    } catch (err: any) {
      throw err;
    }
  }
)

const initialState: InitialState = {
  isLoadingProducts: true,
  failedToLoadProducts: false,
  products: [],
}

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, (state, action) => {
        state.isLoadingProducts = true;
        state.failedToLoadProducts = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoadingProducts = false;
        state.failedToLoadProducts = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoadingProducts = false;
      })
  }
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectIsLoadingProducts = (state: RootState) => state.product.isLoadingProducts;

export default productSlice.reducer;
