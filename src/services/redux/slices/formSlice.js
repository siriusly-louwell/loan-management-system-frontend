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
      const quantArr = quantity ? quantity : [];
      quantArr[action.payload.index] = action.payload.num;

      state.formData = { ...state.formData, quantity: quantArr };
    },

    initialForm: (state, action) => {
      state.formData = action.payload;
    },

    setFormColor: (state, action) => {
      state.formData.color = action.payload;
    }
  },
});

export const {
  changeColor,
  resetInput,
  handleChange,
  handleQuantity,
  setColorIndex,
  initialForm,
  setFormColor
} = formSlice.actions;
export default formSlice.reducer;
