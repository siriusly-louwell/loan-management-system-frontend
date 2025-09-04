import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import unitReducer from "./slices/unitSlice";
import formReducer from "./slices/formSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    unit: unitReducer,
    form: formReducer,
  },
});

export default store;
