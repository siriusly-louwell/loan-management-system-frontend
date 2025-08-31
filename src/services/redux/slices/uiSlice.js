import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    toggle: false,
    type: null,
    message: "",
  },
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = {
        toggle: true,
        ...action.payload, // { type, message }
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
      state.loading = action.payload; // true or false
    },
  },
});

export const { setAlert, clearAlert, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
