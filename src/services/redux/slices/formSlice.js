import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {},
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

    resetInput: (state) => {
      state.formData = {};
      state.colors = [];
    },

    handleChange: (state, action) => {
      state.formData = {
        ...state.formData,
        [action.payload.name]: action.payload.value,
      };
    },

    handleQuantity: (state, action) => {
      const quantity = state.formData.quantity;
      const data = action.payload;
      let quantState;

      switch (data.type) {
        case "application":
          quantState = data.num
          break;
        default:
          quantState = quantity ? quantity : [];
          // quantState = quantity || [];
          quantState[data.index] = data.num;
      }

      state.formData = { ...state.formData, quantity: quantState };
    },

    initialForm: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const {
  changeColor,
  resetInput,
  handleChange,
  handleQuantity,
  setColorIndex,
  initialForm,
} = formSlice.actions;
export default formSlice.reducer;
