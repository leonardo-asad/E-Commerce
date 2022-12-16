import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartProducts,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  checkStock,
  checkout
} from "../../apis/cart";
import { RootState } from "../store";
import * as Types from '../../types/types';

interface InitialState {
  isLoadingCartProducts: boolean
  failedToLoadCartProducts: boolean
  products: Types.CartProducts
  successMessage: undefined | string
  error: undefined | string
};

const initialState: InitialState = {
  isLoadingCartProducts: true,
  failedToLoadCartProducts: false,
  products: [],
  successMessage: undefined,
  error: undefined
};

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

export const verifyStock = createAsyncThunk(
  '/cart/verifyStock',
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkStock();

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

export const checkoutCart = createAsyncThunk(
  '/cart/checkoutCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkout();

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
  reducers: {
    cleanMessages(state) {
      state.error = undefined;
      state.successMessage = undefined;
    },
    emptyCart(state) {
      state.products = [];
    }
  },
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
      .addCase(createCartItem.pending, (state, action) => {
        state.successMessage = undefined;
        state.error = undefined;
      })
      .addCase(createCartItem.rejected, (state, action) => {
        state.successMessage = undefined;
        state.error = "Product existent in Cart";
      })
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.successMessage = "Product added successfully";
        state.error = undefined;
      })
      .addCase(editCartItem.pending, (state, action) => {
        state.successMessage = undefined;
        state.error = undefined;
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        state.products = state.products.map(product => {
          if (product.product_id === parseInt(action.payload.product_id)) {
            return {
              ...product,
              quantity_order: action.payload.updated_quantity,
              total_price: (parseInt(product.price) * action.payload.updated_quantity).toString()
            }
          }
          return product;
        });
        state.successMessage = "Quantity updated successfully";
      })
      .addCase(removeCartItem.pending, (state, action) => {
        state.successMessage = undefined;
        state.error = undefined;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.product_id !== parseInt(action.payload.product_id));
        state.successMessage = "Product removed successfully";
      })
      .addCase(verifyStock.pending, (state, action) => {
        state.successMessage = undefined;
        state.error = undefined;
      })
      .addCase(verifyStock.rejected, (state, action) => {
        state.successMessage = undefined;
        state.error = "Check product stock";
      })
      .addCase(verifyStock.fulfilled, (state, action) => {
        state.successMessage = undefined;
        state.error = undefined;
      })
      .addCase(checkoutCart.pending, (state, action) => {
        state.successMessage = undefined;
        state.error = undefined;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.successMessage = undefined;
        state.error = "Error during checkout";
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.successMessage = "Purchase Complete";
        state.error = undefined;
        state.products = [];
      })
  }
});

export const selectCartProducts = (state: RootState) => state.cart.products;
export const selectIsLoadingCartProducts = (state: RootState) => state.cart.isLoadingCartProducts;
export const selectSuccessMessage = (state: RootState) => state.cart.successMessage;
export const selectErrorMessage = (state: RootState) => state.cart.error;

export const { cleanMessages, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
