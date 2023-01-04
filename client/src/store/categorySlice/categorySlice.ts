import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../../apis/category";
import { RootState } from "../store";
import * as Types from '../../types/types';

export const loadCategories = createAsyncThunk(
  'category/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();

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

interface InitialState {
  isLoadingCategories: boolean
  failedToLoadCategories: boolean
  categories: Types.Categories
};

const initialState: InitialState = {
  isLoadingCategories: true,
  failedToLoadCategories: false,
  categories: []
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadCategories.pending, (state, action) => {
        state.isLoadingCategories = true;
        state.failedToLoadCategories = false;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.isLoadingCategories = false;
        state.failedToLoadCategories = true;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.isLoadingCategories = false;
        state.failedToLoadCategories = false;
        state.categories = action.payload;
      })
  }
});

export const selectIsLoadingCategories = (state: RootState) => state.category.isLoadingCategories;
export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer;
