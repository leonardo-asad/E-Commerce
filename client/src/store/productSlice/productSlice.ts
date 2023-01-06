import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getProductById } from "../../apis/product";
import { RootState } from "../store";
import * as Types from '../../types/types';

interface InitialState {
  isLoadingProducts: boolean,
  failedToLoadProducts: boolean,
  isLoadingProduct: boolean,
  failedToLoadProduct: boolean,
  products: Types.Products
  selectedProduct: Types.Product | undefined
  currentPage: number | undefined,
  lastPage: number | undefined,
}

const initialState: InitialState = {
  isLoadingProducts: true,
  isLoadingProduct: true,
  failedToLoadProduct: false,
  failedToLoadProducts: false,
  products: [],
  selectedProduct: undefined,
  currentPage: undefined,
  lastPage: undefined,
}

interface LoadProductsParams {
  page?: number
  category?: string
}

export const loadProducts = createAsyncThunk(
  'product/products',
  async (params: LoadProductsParams, { rejectWithValue }) => {
    try {
      const response = await getAllProducts(params.page, params.category);
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

export const loadProductById = createAsyncThunk(
  'product/loadProductById',
  async (product_id: number, { rejectWithValue }) => {
    try {
      const response = await getProductById(product_id);
      if (response.status === 200) {
        const data = await response.data;
        return data;
      }
      const data = await response.data;
      return rejectWithValue(data);
    } catch (err) {
      throw err;
    }
  }
);

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
        state.products = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.lastPage = action.payload.lastPage;
        state.isLoadingProducts = false;
      })
      .addCase(loadProductById.pending, (state, action) => {
        state.isLoadingProduct = true;
        state.failedToLoadProduct = false;
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.failedToLoadProduct = true;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.failedToLoadProduct = false;
        state.selectedProduct = action.payload;
      })
  }
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectCurrentPage = (state: RootState) => state.product.currentPage;
export const selectLastPage = (state: RootState) => state.product.lastPage;
export const selectIsLoadingProducts = (state: RootState) => state.product.isLoadingProducts;
export const selectSelectedProduct = (state: RootState) => state.product.selectedProduct;
export const selectIsLoadingProduct = (state: RootState) => state.product.isLoadingProduct;

export default productSlice.reducer;
