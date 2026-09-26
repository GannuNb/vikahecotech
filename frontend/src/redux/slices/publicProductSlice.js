import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../services/api";

// ======================================
// GET PUBLIC PRODUCTS BY APPLICATION NAME
// ======================================

export const fetchPublicProductsByApplicationName =
  createAsyncThunk(
    "publicProduct/fetchProductsByApplicationName",
    async (applicationName, { rejectWithValue }) => {
      try {
        const response = await api.get(
          `/api/public/products/application/${encodeURIComponent(
            applicationName
          )}`
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch public products"
        );
      }
    }
  );

// ======================================
// GET PUBLIC PRODUCT BY SLUG
// ======================================

export const fetchPublicProductBySlug =
  createAsyncThunk(
    "publicProduct/fetchProductBySlug",
    async (slug, { rejectWithValue }) => {
      try {
        const response = await api.get(
          `/api/public/products/slug/${encodeURIComponent(
            slug
          )}`
        );

        return response.data.product;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch public product"
        );
      }
    }
  );

// ======================================
// INITIAL STATE
// ======================================

const initialState = {
  application: null,
  products: [],

  currentProduct: null,

  loading: false,
  error: null,
};

// ======================================
// SLICE
// ======================================

const publicProductSlice = createSlice({
  name: "publicProduct",

  initialState,

  reducers: {
    clearPublicProducts: (state) => {
      state.application = null;
      state.products = [];
      state.loading = false;
      state.error = null;
    },

    clearCurrentPublicProduct: (state) => {
      state.currentProduct = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================
      // GET PRODUCTS BY APPLICATION
      // ======================================

      .addCase(
        fetchPublicProductsByApplicationName.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchPublicProductsByApplicationName.fulfilled,
        (state, action) => {
          state.loading = false;

          state.application =
            action.payload.application || null;

          state.products =
            action.payload.products || [];

          state.error = null;
        }
      )

      .addCase(
        fetchPublicProductsByApplicationName.rejected,
        (state, action) => {
          state.loading = false;

          state.application = null;
          state.products = [];

          state.error =
            action.payload ||
            "Failed to fetch public products";
        }
      )

      // ======================================
      // GET PUBLIC PRODUCT BY SLUG
      // ======================================

      .addCase(
        fetchPublicProductBySlug.pending,
        (state) => {
          state.loading = true;
          state.currentProduct = null;
          state.error = null;
        }
      )

      .addCase(
        fetchPublicProductBySlug.fulfilled,
        (state, action) => {
          state.loading = false;

          state.currentProduct =
            action.payload || null;

          state.error = null;
        }
      )

      .addCase(
        fetchPublicProductBySlug.rejected,
        (state, action) => {
          state.loading = false;

          state.currentProduct = null;

          state.error =
            action.payload ||
            "Failed to fetch public product";
        }
      );
  },
});

// ======================================
// ACTIONS
// ======================================

export const {
  clearPublicProducts,
  clearCurrentPublicProduct,
} = publicProductSlice.actions;

// ======================================
// REDUCER
// ======================================

export default publicProductSlice.reducer;