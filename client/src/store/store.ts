import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice/userSlice';
import productReducer from './productSlice/productSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
