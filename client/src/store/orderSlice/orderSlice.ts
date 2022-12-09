import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrders } from "../../apis/order";
import { RootState } from "../store";
import * as Types from '../../types/types';

interface InitialState {
  isLoadingOrders: boolean
  failedToLoadOrders: boolean
  orders: Types.Orders
}

const initialState: InitialState = {
  isLoadingOrders: true,
  failedToLoadOrders: false,
  orders: []
}

export const loadOrders = createAsyncThunk(
  '/order/loadOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllOrders();

      if (response.status === 200) {
        const data = await response.data;
        return data;
      }
      const data = await response.data;
      return data;
    } catch (err) {
      throw err;
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadOrders.pending, (state, action) => {
        state.isLoadingOrders = true;
        state.failedToLoadOrders = false;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.isLoadingOrders = false;
        state.failedToLoadOrders = true;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.isLoadingOrders = false;
        state.failedToLoadOrders = false;
        state.orders = action.payload;
      })
  }
});

export const selectOrders = (state: RootState) => state.order.orders;
export const selectIsLoadingOrders = (state: RootState) => state.order.isLoadingOrders;

export default orderSlice.reducer;
