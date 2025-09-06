import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    toggle: false,
    type: null,
    message: "",
    duration: 0.4,
  },
  loading: { isActive: false, text: "Fetching data..." },
  modals: {},
  carouselSlide: 0,
  filter: null,
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

    toggleModal: (state, action) => {
      state.modals = {
        ...state.modals,
        [action.payload.name]: !action.payload.value,
      };
    },

    toggleSlide: (state, action) => {
      const data = action.payload;
      const slide = state.carouselSlide;

      switch (data.type) {
        case "prev":
          state.carouselSlide = (slide - 1 + data.limit) % data.limit;
          break;
        case "next":
        case "auto":
          state.carouselSlide = (slide + 1) % data.limit;
          break;
        default:
          state.carouselSlide = data.value;
      }
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setAlert,
  clearAlert,
  setLoading,
  toggleModal,
  toggleSlide,
  setFilter,
} = uiSlice.actions;
export default uiSlice.reducer;
