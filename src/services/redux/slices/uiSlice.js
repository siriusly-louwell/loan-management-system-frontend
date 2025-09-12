import { createSlice } from "@reduxjs/toolkit";
import { FORM_ROUTES } from "../../../constants/formRoutes";

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
  pageNum: 0,
  stepIndex: null,
  pageRoute: null,
  toggled: null,
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

    inputCheck: (state, action) => {
      const data = action.payload;

      switch (data.key) {
        case "downpayment":
          return state.formData.downpayment < data.value;
        default:
          return data.value === "__EMPTY__";
      }
    },

    nextPage: (state) => {
      const nextIndex = state.pageNum + 1;

      if (nextIndex < FORM_ROUTES.length) {
        state.pageRoute = FORM_ROUTES[nextIndex];
        state.pageNum = nextIndex;
      }
    },

    prevPage: (state) => {
      const nextIndex = state.pageNum - 1;

      if (nextIndex >= 0) {
        state.pageRoute = FORM_ROUTES[nextIndex];
        state.pageNum = nextIndex;
      }

      state.toggled = Date.now();
    },

    setStep: (state, action) => {
      state.stepIndex = action.payload;
    },

    goToStep: (state, action) => {
      state.pageRoute = FORM_ROUTES[action.payload];
      state.pageNum = action.payload;
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
  inputCheck,
  nextPage,
  prevPage,
  goToStep,
  setStep,
} = uiSlice.actions;
export default uiSlice.reducer;
