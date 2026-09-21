import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../services/api";

// =========================
// GET ALL CATEGORIES
// =========================
export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/categories");

            return response.data.categories;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );
        }
    }
);
// =========================
// GET CATEGORY BY ID
// =========================
export const fetchCategoryById = createAsyncThunk(
    "category/fetchCategoryById",
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `/api/categories/${categoryId}`
            );

            return response.data.category;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch category"
            );
        }
    }
);

// =========================
// CREATE CATEGORY
// =========================
export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (name, { rejectWithValue }) => {
        try {
            const response = await api.post("/api/categories", {
                name,
            });

            return response.data.category;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create category"
            );
        }
    }
);

// =========================
// UPDATE CATEGORY
// =========================
export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ categoryId, name }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `/api/categories/${categoryId}`,
                {
                    name,
                }
            );

            return response.data.category;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update category"
            );
        }
    }
);

// =========================
// DELETE CATEGORY
// =========================
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (categoryId, { rejectWithValue }) => {
        try {
            await api.delete(
                `/api/categories/${categoryId}`
            );

            return categoryId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete category"
            );
        }
    }
);

const initialState = {
    categories: [],
    currentCategory: null,

    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: null,
};

const categorySlice = createSlice({
    name: "category",

    initialState,

    reducers: {
        clearCategoryError: (state) => {
            state.error = null;
        },
        clearCurrentCategory: (state) => {
            state.currentCategory = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // =========================
            // FETCH
            // =========================
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })

            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to fetch categories";
            })
            // =========================
            // FETCH CATEGORY BY ID
            // =========================
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCategory = action.payload;
            })

            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to fetch category";
            })



            // =========================
            // CREATE
            // =========================
            .addCase(createCategory.pending, (state) => {
                state.creating = true;
                state.error = null;
            })

            .addCase(createCategory.fulfilled, (state, action) => {
                state.creating = false;

                state.categories.push(action.payload);
            })

            .addCase(createCategory.rejected, (state, action) => {
                state.creating = false;
                state.error =
                    action.payload || "Failed to create category";
            })

            // =========================
            // UPDATE
            // =========================
            .addCase(updateCategory.pending, (state) => {
                state.updating = true;
                state.error = null;
            })

            .addCase(updateCategory.fulfilled, (state, action) => {
                state.updating = false;

                const updatedCategory = action.payload;

                const index = state.categories.findIndex(
                    (category) =>
                        category._id === updatedCategory._id
                );

                if (index !== -1) {
                    state.categories[index] = updatedCategory;
                }
            })

            .addCase(updateCategory.rejected, (state, action) => {
                state.updating = false;
                state.error =
                    action.payload || "Failed to update category";
            })

            // =========================
            // DELETE
            // =========================
            .addCase(deleteCategory.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })

            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.deleting = false;

                state.categories = state.categories.filter(
                    (category) =>
                        category._id !== action.payload
                );
            })

            .addCase(deleteCategory.rejected, (state, action) => {
                state.deleting = false;
                state.error =
                    action.payload || "Failed to delete category";
            });
    },
});

export const {
    clearCategoryError,
    clearCurrentCategory,
} = categorySlice.actions;

export default categorySlice.reducer;