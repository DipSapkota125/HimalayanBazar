import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";

//get all products
export const getProducts = createAsyncThunk(
  "/all/products",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get category products
export const categoryProducts = createAsyncThunk(
  "/category/products",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.productsCategory(category);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get single Product
export const singleProducts = createAsyncThunk(
  "/single/product",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSingleProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: "",
    error: "",
    message: "",
    products: [],
    product: {},
    categories: [],
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(singleProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(singleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(categoryProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(categoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = productSlice.actions;

export default productSlice.reducer;
