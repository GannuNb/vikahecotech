import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../services/api";

// =========================================
// GET SPECIFICATION REQUESTS
// =========================================

export const fetchSpecificationRequests =
    createAsyncThunk(
        "specificationRequest/fetchAll",
        async (
            {
                page = 1,
                limit = 10,
                status = "all",
                search = "",
            } = {},
            { rejectWithValue }
        ) => {
            try {
                const response = await api.get(
                    "/api/admin/specification-requests",
                    {
                        params: {
                            page,
                            limit,
                            status,
                            search,
                        },
                    }
                );

                return response.data;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to fetch specification requests"
                );
            }
        }
    );

// =========================================
// GET SINGLE REQUEST
// =========================================

export const fetchSpecificationRequestById =
    createAsyncThunk(
        "specificationRequest/fetchById",
        async (requestId, { rejectWithValue }) => {
            try {
                const response = await api.get(
                    `/api/admin/specification-requests/${requestId}`
                );

                return response.data.request;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to fetch specification request"
                );
            }
        }
    );

// =========================================
// UPDATE REQUEST STATUS
// =========================================

export const updateSpecificationRequestStatus =
    createAsyncThunk(
        "specificationRequest/updateStatus",
        async (
            { requestId, status },
            { rejectWithValue }
        ) => {
            try {
                const response = await api.patch(
                    `/api/admin/specification-requests/${requestId}/status`,
                    {
                        status,
                    }
                );

                return response.data.request;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to update request status"
                );
            }
        }
    );

// =========================================
// INITIAL STATE
// =========================================

const initialState = {
    requests: [],

    currentRequest: null,

    pagination: {
        currentPage: 1,
        limit: 10,
        totalRequests: 0,
        totalPages: 1,
    },

    counts: {
        all: 0,
        requested: 0,
        processing: 0,
        completed: 0,
        failed: 0,
    },

    loading: false,
    detailsLoading: false,
    updating: false,

    error: null,
};

// =========================================
// SLICE
// =========================================

const specificationRequestSlice = createSlice({
    name: "specificationRequest",

    initialState,

    reducers: {
        clearSpecificationRequestError: (state) => {
            state.error = null;
        },

        clearCurrentSpecificationRequest: (state) => {
            state.currentRequest = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // =====================================
            // FETCH ALL - PENDING
            // =====================================

            .addCase(
                fetchSpecificationRequests.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            // =====================================
            // FETCH ALL - SUCCESS
            // =====================================

            .addCase(
                fetchSpecificationRequests.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.requests =
                        action.payload.requests || [];

                    state.pagination =
                        action.payload.pagination || {
                            currentPage: 1,
                            limit: 10,
                            totalRequests: 0,
                            totalPages: 1,
                        };

                    state.counts =
                        action.payload.counts || {
                            all: 0,
                            requested: 0,
                            processing: 0,
                            completed: 0,
                            failed: 0,
                        };
                }
            )

            // =====================================
            // FETCH ALL - ERROR
            // =====================================

            .addCase(
                fetchSpecificationRequests.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to fetch specification requests";
                }
            )

            // =====================================
            // FETCH SINGLE - PENDING
            // =====================================

            .addCase(
                fetchSpecificationRequestById.pending,
                (state) => {
                    state.detailsLoading = true;
                    state.error = null;
                }
            )

            // =====================================
            // FETCH SINGLE - SUCCESS
            // =====================================

            .addCase(
                fetchSpecificationRequestById.fulfilled,
                (state, action) => {
                    state.detailsLoading = false;

                    state.currentRequest =
                        action.payload;
                }
            )

            // =====================================
            // FETCH SINGLE - ERROR
            // =====================================

            .addCase(
                fetchSpecificationRequestById.rejected,
                (state, action) => {
                    state.detailsLoading = false;

                    state.error =
                        action.payload ||
                        "Failed to fetch specification request";
                }
            )

            // =====================================
            // UPDATE STATUS - PENDING
            // =====================================

            .addCase(
                updateSpecificationRequestStatus.pending,
                (state) => {
                    state.updating = true;
                    state.error = null;
                }
            )

            // =====================================
            // UPDATE STATUS - SUCCESS
            // =====================================

            .addCase(
                updateSpecificationRequestStatus.fulfilled,
                (state, action) => {
                    state.updating = false;

                    const updatedRequest =
                        action.payload;

                    state.currentRequest =
                        updatedRequest;

                    state.requests =
                        state.requests.map((request) =>
                            request._id === updatedRequest._id
                                ? updatedRequest
                                : request
                        );
                }
            )

            // =====================================
            // UPDATE STATUS - ERROR
            // =====================================

            .addCase(
                updateSpecificationRequestStatus.rejected,
                (state, action) => {
                    state.updating = false;

                    state.error =
                        action.payload ||
                        "Failed to update request status";
                }
            );
    },
});

export const {
    clearSpecificationRequestError,
    clearCurrentSpecificationRequest,
} = specificationRequestSlice.actions;

export default specificationRequestSlice.reducer;