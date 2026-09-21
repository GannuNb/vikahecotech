import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../services/api";

// ===============================
// GET ALL PRODUCTS
// ===============================
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/products");

      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    }
  }
);

// ===============================
// GET PRODUCTS BY APPLICATION
// ===============================
export const fetchProductsByApplication = createAsyncThunk(
  "product/fetchProductsByApplication",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/products/application/${applicationId}`
      );

      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    }
  }
);

// ===============================
// GET PRODUCT BY ID
// ===============================
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/products/${productId}`
      );

      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch product"
      );
    }
  }
);

// ===============================
// GET PRODUCT BY SLUG
// PUBLIC
// ===============================
export const fetchProductBySlug = createAsyncThunk(
  "product/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/products/slug/${slug}`
      );

      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch product"
      );
    }
  }
);

// ===============================
// CREATE PRODUCT
// ===============================
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/products",
        productData
      );

      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create product"
      );
    }
  }
);

// ===============================
// UPDATE PRODUCT
// ===============================
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { productId, productData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/api/products/${productId}`,
        productData
      );

      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update product"
      );
    }
  }
);

// ===============================
// DELETE PRODUCT
// ===============================
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(
        `/api/products/${productId}`
      );

      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  }
);

// ===============================
// INITIAL STATE
// ===============================
const initialState = {
  products: [],
  currentProduct: null,

  loading: false,
  creating: false,
  updating: false,
  deleting: false,

  error: null,
};

// ===============================
// PRODUCT SLICE
// ===============================
const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },

    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===============================
      // FETCH ALL PRODUCTS
      // ===============================
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch products";
      })

      // ===============================
      // FETCH PRODUCTS BY APPLICATION
      // ===============================
      .addCase(
        fetchProductsByApplication.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProductsByApplication.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products = action.payload;
        }
      )

      .addCase(
        fetchProductsByApplication.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch products";
        }
      )

      // ===============================
      // FETCH PRODUCT BY ID
      // ===============================
      .addCase(
        fetchProductById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProductById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.currentProduct = action.payload;
        }
      )

      .addCase(
        fetchProductById.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch product";
        }
      )

      // ===============================
      // FETCH PRODUCT BY SLUG
      // ===============================
      .addCase(
        fetchProductBySlug.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.currentProduct = null;
        }
      )

      .addCase(
        fetchProductBySlug.fulfilled,
        (state, action) => {
          state.loading = false;
          state.currentProduct = action.payload;
        }
      )

      .addCase(
        fetchProductBySlug.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch product";
        }
      )

      // ===============================
      // CREATE PRODUCT
      // ===============================
      .addCase(
        createProduct.pending,
        (state) => {
          state.creating = true;
          state.error = null;
        }
      )

      .addCase(
        createProduct.fulfilled,
        (state, action) => {
          state.creating = false;

          state.products.unshift(
            action.payload
          );
        }
      )

      .addCase(
        createProduct.rejected,
        (state, action) => {
          state.creating = false;

          state.error =
            action.payload ||
            "Failed to create product";
        }
      )

      // ===============================
      // UPDATE PRODUCT
      // ===============================
      .addCase(
        updateProduct.pending,
        (state) => {
          state.updating = true;
          state.error = null;
        }
      )

      .addCase(
        updateProduct.fulfilled,
        (state, action) => {
          state.updating = false;

          const index =
            state.products.findIndex(
              (product) =>
                product._id === action.payload._id
            );

          if (index !== -1) {
            state.products[index] =
              action.payload;
          }

          state.currentProduct =
            action.payload;
        }
      )

      .addCase(
        updateProduct.rejected,
        (state, action) => {
          state.updating = false;

          state.error =
            action.payload ||
            "Failed to update product";
        }
      )

      // ===============================
      // DELETE PRODUCT
      // ===============================
      .addCase(
        deleteProduct.pending,
        (state) => {
          state.deleting = true;
          state.error = null;
        }
      )

      .addCase(
        deleteProduct.fulfilled,
        (state, action) => {
          state.deleting = false;

          state.products =
            state.products.filter(
              (product) =>
                product._id !== action.payload
            );

          if (
            state.currentProduct?._id ===
            action.payload
          ) {
            state.currentProduct = null;
          }
        }
      )

      .addCase(
        deleteProduct.rejected,
        (state, action) => {
          state.deleting = false;

          state.error =
            action.payload ||
            "Failed to delete product";
        }
      );
  },
});

// ===============================
// EXPORT ACTIONS
// ===============================
export const {
  clearProductError,
  clearCurrentProduct,
} = productSlice.actions;

// ===============================
// EXPORT REDUCER
// ===============================
export default productSlice.reducer;