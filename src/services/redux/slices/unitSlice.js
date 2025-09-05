import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUnitUseCase } from "../../usecases/unit/addUnitUseCase";
import { unitRepository } from "../../repositories/unitRepository";

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

export const fetchUnits = createAsyncThunk(
  "unit/fetchUnits",
  async (unit, thunkAPI) => {
    try {
      return await unitRepository.fetchAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const UnitSlice = createSlice({
  name: "unit",
  initialState: {
    unit: {},
    units: [],
    loading: true,
    error: null,
  },
  reducers: {
    createEntity: (state, action) => {
      const data = action.payload;

      return data.brand === data.filter && data.filter !== "";
    },
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
      })

      // ? fetch all units
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { brandFilter } = UnitSlice.actions;
export default UnitSlice.reducer;
