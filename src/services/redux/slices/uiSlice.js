import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    toggle: false,
    type: null,
    message: "",
    duration: 0.4,
  },
  loading: { isActive: false, text: "" },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = {
        toggle: true,
        ...action.payload,
      };
    },
    clearAlert: (state) => {
      state.alert = {
        toggle: false,
        type: null,
        message: "",
      };
    },
    setLoading: (state, action) => {
      state.loading = { ...action.payload };
    },
  },
});

export const { setAlert, clearAlert, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
