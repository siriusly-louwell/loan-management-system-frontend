import { createSlice } from "@reduxjs/toolkit";
import { ALL_COLORS, OFC_COLORS } from "../../../constants/colors";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    colors: ALL_COLORS,
    including: false,
    type: "all",
    newColor: null,
  },
  reducers: {
    // setup: (state, action) => {
    //   state.colors =
    //     action.payload.type === "ofc" ? OFC_COLORS : action.payload.arr;

    //   state.type = action.payload.type === "ofc" ? "official" : "custom";
    // },

    // setColors: (state, action) => {
    //     const data = action.payload;
    //     state.newColor = state.type ? data.color.color : data.color;
    // },

  },
});

// export const {  } = colorSlice.actions;
export default colorSlice.reducer;
