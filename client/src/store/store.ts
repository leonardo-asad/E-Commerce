import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice/userSlice';
import productReducer from './productSlice/productSlice'
import CartReducer from './cartSlice/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: CartReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
