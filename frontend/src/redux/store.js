import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import applicationReducer from "./slices/applicationSlice";
import productReducer from "./slices/productSlice";
import publicProductReducer from "./slices/publicProductSlice";
import specificationRequestReducer from "./slices/specificationRequestSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    application: applicationReducer,
    product: productReducer,
    publicProduct: publicProductReducer,
    specificationRequest: specificationRequestReducer,
  },
});

export default store;