import { createSlice } from "@reduxjs/toolkit";
import { FORM_ROUTES } from "../../../constants/formRoutes";

const initialState = {
  alert: {
    toggle: false,
    type: null,
    message: "",
    duration: 0.4,
  },
  loading: { isActive: false },
  modals: {},
  modal: {},
  imgPreview: null,
  carouselSlide: 0,
  filter: null,
  filterType: null,
  pageNum: 0,
  stepIndex: null,
  pageRoute: null,
  toggled: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetState: (state) => {
      state.pageNum = 0;
      state.stepIndex = null;
      state.pageRoute = null;
      state.modals = {};
      state.modal = {};
    },

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

    setModal: (state, action) => {
      state.modal = action.payload;
    },

    setPreview: (state, action) => {
      state.imgPreview = action.payload;
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

    setFilterType: (state, action) => {
      state.filterType = action.payload;
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

    dateFormat: (state, action) => {
      const newDate = new Date(action.payload);
      const formatted = new Intl.DateTimeFormat("en-GB").format(newDate);
    },
  },
});

export const {
  resetState,
  setAlert,
  clearAlert,
  setLoading,
  toggleModal,
  setModal,
  setPreview,
  toggleSlide,
  setFilter,
  setFilterType,
  inputCheck,
  nextPage,
  prevPage,
  goToStep,
  setStep,
} = uiSlice.actions;
export default uiSlice.reducer;
