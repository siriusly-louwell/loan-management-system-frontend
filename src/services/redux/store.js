import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import unitReducer from "./slices/unitSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    unit: unitReducer,
  },
});

export default store;
