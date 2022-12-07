import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartProducts, addCartItem, updateCartItem, deleteCartItem } from "../../apis/cart";
import { RootState } from "../store";
import * as Types from '../../types/types';

interface InitialState {
  isLoadingCartProducts: boolean
  failedToLoadCartProducts: boolean
  products: Types.CartProducts
}

const initialState: InitialState = {
  isLoadingCartProducts: true,
  failedToLoadCartProducts: false,
  products: []
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

export const createCartItem = createAsyncThunk(
  '/cart/createCartItem',
  async(requestBody: Types.RequestBodyAddToCart, { rejectWithValue }) => {
    try {
      const response = await addCartItem(requestBody);
      if (response.status === 201) {
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

export const editCartItem = createAsyncThunk(
  '/cart/editCartItem',
  async({productId, requestBody}: Types.AsyncThunkUpdateCartItem, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(productId, requestBody);
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

export const removeCartItem = createAsyncThunk(
  '/cart/removeCartItem',
  async (product_id: number, { rejectWithValue }) => {
    try {
      const response = await deleteCartItem(product_id);
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
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        state.products = state.products.map(product => {
          if (product.product_id === parseInt(action.payload.product_id)) {
            return {...product, quantity_order: action.payload.updated_quantity}
          }
          return product;
        })
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.product_id !== parseInt(action.payload.product_id));
      })
  }
});

export const selectCartProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
