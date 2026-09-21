import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../services/api";

// ADMIN LOGIN
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const storedToken = localStorage.getItem("adminToken");

const storedUser = localStorage.getItem("adminUser");

const initialState = {
  token: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;

      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem(
          "adminToken",
          action.payload.token
        );

        localStorage.setItem(
          "adminUser",
          JSON.stringify(action.payload.user)
        );
      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const {
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;