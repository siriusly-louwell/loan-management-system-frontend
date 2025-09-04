import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {},
    files: [],
    colors: [],
    error: null,
  },
  reducers: {
    changeColor: (state, action) => {
      const data = action.payload;
      const updatedColors = [...state.colors];

      if (updatedColors[data.colorIndex] === data.newColor)
        updatedColors[data.colorIndex] = null;
      else updatedColors[data.colorIndex] = data.newColor;

      state.colors = updatedColors;
    },

    resetInput: (state) => {
      state.formData = {};
      state.colors = [];
      state.files = [];
    },

    fileChange: (state, action) => {
      const data = action.payload;
      const updatedFiles = [...state.files];
      updatedFiles[data.i] = [...data.files];

      state.files = updatedFiles;
    },

    handleChange: (state, action) => {
      state.formData({
        ...state.formData,
        [action.payload.name]: action.payload.quantity,
      });
    },

    handleQuantity: (state, action) => {
      const quantity = state.formData.quantity;
      const quantArr = quantity ? quantity : [];
      quantArr[action.payload.i] = action.payload.num;

      state.formData = { ...state.formData, quantity: quantArr };
    },
  },
});

export const { changeColor, resetInput, fileChange, handleChange } =
  formSlice.actions;
export default formSlice.reducer;
