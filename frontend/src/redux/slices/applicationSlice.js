import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../services/api";

// =========================
// GET ALL APPLICATIONS
// =========================
export const fetchApplications = createAsyncThunk(
  "application/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/applications");

      return response.data.applications;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch applications"
      );
    }
  }
);

// =========================
// GET APPLICATIONS BY CATEGORY
// =========================
export const fetchApplicationsByCategory = createAsyncThunk(
  "application/fetchApplicationsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/applications/category/${categoryId}`
      );

      return response.data.applications;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch applications"
      );
    }
  }
);

// =========================
// GET APPLICATION BY ID
// =========================
export const fetchApplicationById = createAsyncThunk(
  "application/fetchApplicationById",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/applications/${applicationId}`
      );

      return response.data.application;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch application"
      );
    }
  }
);

// =========================
// CREATE APPLICATION
// =========================
export const createApplication = createAsyncThunk(
  "application/createApplication",
  async ({ category, name }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/applications",
        {
          category,
          name,
        }
      );

      return response.data.application;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create application"
      );
    }
  }
);

// =========================
// UPDATE APPLICATION
// =========================
export const updateApplication = createAsyncThunk(
  "application/updateApplication",
  async (
    { applicationId, name },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/api/applications/${applicationId}`,
        {
          name,
        }
      );

      return response.data.application;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update application"
      );
    }
  }
);

// =========================
// DELETE APPLICATION
// =========================
export const deleteApplication = createAsyncThunk(
  "application/deleteApplication",
  async (
    applicationId,
    { rejectWithValue }
  ) => {
    try {
      await api.delete(
        `/api/applications/${applicationId}`
      );

      return applicationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete application"
      );
    }
  }
);

// =========================
// INITIAL STATE
// =========================
const initialState = {
  applications: [],
  currentApplication: null,

  loading: false,
  creating: false,
  updating: false,
  deleting: false,

  error: null,
};

// =========================
// SLICE
// =========================
const applicationSlice = createSlice({
  name: "application",

  initialState,

  reducers: {
    // =========================
    // CLEAR ERROR
    // =========================
    clearApplicationError: (state) => {
      state.error = null;
    },

    // =========================
    // CLEAR CURRENT APPLICATION
    // =========================
    clearCurrentApplication: (state) => {
      state.currentApplication = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // FETCH ALL
      // =========================
      .addCase(
        fetchApplications.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchApplications.fulfilled,
        (state, action) => {
          state.loading = false;
          state.applications = action.payload;
        }
      )

      .addCase(
        fetchApplications.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch applications";
        }
      )

      // =========================
      // FETCH BY CATEGORY
      // =========================
      .addCase(
        fetchApplicationsByCategory.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchApplicationsByCategory.fulfilled,
        (state, action) => {
          state.loading = false;
          state.applications = action.payload;
        }
      )

      .addCase(
        fetchApplicationsByCategory.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch applications";
        }
      )

      // =========================
      // FETCH APPLICATION BY ID
      // =========================
      .addCase(
        fetchApplicationById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.currentApplication = null;
        }
      )

      .addCase(
        fetchApplicationById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.currentApplication = action.payload;
        }
      )

      .addCase(
        fetchApplicationById.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch application";
        }
      )

      // =========================
      // CREATE
      // =========================
      .addCase(
        createApplication.pending,
        (state) => {
          state.creating = true;
          state.error = null;
        }
      )

      .addCase(
        createApplication.fulfilled,
        (state, action) => {
          state.creating = false;

          state.applications.push(
            action.payload
          );
        }
      )

      .addCase(
        createApplication.rejected,
        (state, action) => {
          state.creating = false;
          state.error =
            action.payload ||
            "Failed to create application";
        }
      )

      // =========================
      // UPDATE
      // =========================
      .addCase(
        updateApplication.pending,
        (state) => {
          state.updating = true;
          state.error = null;
        }
      )

      .addCase(
        updateApplication.fulfilled,
        (state, action) => {
          state.updating = false;

          const index =
            state.applications.findIndex(
              (application) =>
                application._id ===
                action.payload._id
            );

          if (index !== -1) {
            state.applications[index] =
              action.payload;
          }

          // Update current application if
          // it is the same application
          if (
            state.currentApplication?._id ===
            action.payload._id
          ) {
            state.currentApplication =
              action.payload;
          }
        }
      )

      .addCase(
        updateApplication.rejected,
        (state, action) => {
          state.updating = false;
          state.error =
            action.payload ||
            "Failed to update application";
        }
      )

      // =========================
      // DELETE
      // =========================
      .addCase(
        deleteApplication.pending,
        (state) => {
          state.deleting = true;
          state.error = null;
        }
      )

      .addCase(
        deleteApplication.fulfilled,
        (state, action) => {
          state.deleting = false;

          state.applications =
            state.applications.filter(
              (application) =>
                application._id !==
                action.payload
            );

          if (
            state.currentApplication?._id ===
            action.payload
          ) {
            state.currentApplication = null;
          }
        }
      )

      .addCase(
        deleteApplication.rejected,
        (state, action) => {
          state.deleting = false;
          state.error =
            action.payload ||
            "Failed to delete application";
        }
      );
  },
});

// =========================
// EXPORT ACTIONS
// =========================
export const {
  clearApplicationError,
  clearCurrentApplication,
} = applicationSlice.actions;

// =========================
// EXPORT REDUCER
// =========================
export default applicationSlice.reducer;