import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";

//add product(admin)

export const createProduct = createAsyncThunk(
  "/add/product",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.addProduct(formData);
      toast.success(response.data.message || "product create successFully!");
      navigate("/admin/himalayan-dashboard/panel");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//update product(admin)
export const adminUpdateProduct = createAsyncThunk(
  "/update/admin/product",
  async ({ formData, id, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateAdminProduct(formData, id);
      toast.success(response.data.message || "product update successFully!");
      navigate("/admin/himalayan-dashboard/panel");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete product
export const productDelete = createAsyncThunk(
  "/delete/product",
  async ({ id, toast }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.deleteProduct(id);
      toast.success(response.data.message || "product delete successFully!");
      dispatch(productsAdmin());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get all adminProducts
export const productsAdmin = createAsyncThunk(
  "/admin/products",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getAdminProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get single AdminProduct
export const productAdminSingle = createAsyncThunk(
  "/single/admin/product",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.singleAdminProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: "",
    error: "",
    message: "",
    adminProducts: [],
    adminProduct: {},
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(productsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts = action.payload.data;
      })
      .addCase(productsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(productDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload;
      })
      .addCase(productDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(productAdminSingle.pending, (state) => {
        state.loading = true;
      })
      .addCase(productAdminSingle.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload.data;
      })
      .addCase(productAdminSingle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(adminUpdateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminUpdateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload;
      })
      .addCase(adminUpdateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
