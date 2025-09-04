import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUnitUseCase } from "../../usecases/unit/addUnitUseCase";

export const addUnit = createAsyncThunk(
  "unit/addUnit",
  async (unit, thunkAPI) => {
    try {
      return await addUnitUseCase(unit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const UnitSlice = createSlice({
  name: "unit",
  initialState: {
    unit: {},
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.unit = action.payload;
      })
      .addCase(addUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { logout } = UnitSlice.actions;
export default UnitSlice.reducer;
