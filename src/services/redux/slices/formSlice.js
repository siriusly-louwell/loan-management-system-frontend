import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {},
    formType: "createUnit",
    colors: [],
    colorIndex: null,
    error: null,
  },
  reducers: {
    setColorIndex: (state, action) => {
      state.colorIndex = action.payload;
    },

    changeColor: (state, action) => {
      const updatedColors = [...state.colors];

      if (updatedColors[state.colorIndex] === action.payload)
        updatedColors[state.colorIndex] = null;
      else updatedColors[state.colorIndex] = action.payload;

      state.colors = updatedColors;
    },

    setType: (state, action) => {
      state.formType = action.payload;
    },

    resetInput: (state) => {
      state.formData[state.formType] = {};
      state.colors = [];
    },

    handleChange: (state, action) => {
      state.formData[state.formType] = {
        ...state.formData[state.formType],
        [action.payload.name]: action.payload.value,
      };

      // state.formData = {
      //   ...state.formData,
      //   [action.payload.name]: action.payload.value,
      // };
    },

    handleQuantity: (state, action) => {
      const quantity = state.formData[state.formType].quantity;
      const data = action.payload;
      let quantState;

      switch (data.type) {
        case "application":
          quantState = data.num;
          break;
        default:
          quantState = quantity || [];
          quantState[data.index] = Number(data.num);
      }

      state.formData[state.formType] = {
        ...state.formData[state.formType],
        quantity: quantState,
      };
    },

    initialForm: (state, action) => {
      state.formData[state.formType] = action.payload;
    },
  },
});

export const {
  changeColor,
  setType,
  resetInput,
  handleChange,
  handleQuantity,
  setColorIndex,
  initialForm,
} = formSlice.actions;
export default formSlice.reducer;
