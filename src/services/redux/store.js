import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import unitReducer from "./slices/unitSlice";
import formReducer from "./slices/formSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import reportReducer from "./slices/reportSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    ui: uiReducer,
    unit: unitReducer,
    form: formReducer,
    application: applicationReducer,
    report: reportReducer,
    payment: paymentReducer,
  },
});

export default store;
