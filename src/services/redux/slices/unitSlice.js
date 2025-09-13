import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUnitUseCase } from "../../usecases/unit/addUnitUseCase";
import { unitRepository } from "../../repositories/unitRepository";
import UnitAPI from "../../api/UnitAPI";

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

export const fetchUnit = createAsyncThunk(
  "unit/fetchUnit",
  async (unit, thunkAPI) => {
    try {
      const id = unitRepository.getId();
      return await UnitAPI.fetchUnit(id);
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
    unitLoading: true,
    unitsLoading: true,
    images: [],
    error: null,
  },
  reducers: {
    storeID: (state, action) => {
      unitRepository.saveId(action.payload);
    },

    clearID: (state) => {
      unitRepository.clearId();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUnit.pending, (state) => {
        state.unitLoading = true;
        state.error = null;
      })
      .addCase(addUnit.fulfilled, (state, action) => {
        state.unitLoading = false;
        state.unit = action.payload;
      })
      .addCase(addUnit.rejected, (state, action) => {
        state.unitLoading = false;
        state.error = action.payload;
      })

      // ? fetch all units
      .addCase(fetchUnits.pending, (state) => {
        state.unitsLoading = true;
        state.error = null;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.unitsLoading = false;
        state.units = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.unitsLoading = false;
        state.error = action.payload;
      })

      // ? fetch a unit
      .addCase(fetchUnit.pending, (state) => {
        state.unitLoading = true;
        state.error = null;
      })
      .addCase(fetchUnit.fulfilled, (state, action) => {
        state.unitLoading = false;
        state.unit = action.payload;

        state.unit.images.map((file, i) => {
          state.images[i] = `http://127.0.0.1:8000/storage/${file.path}`;
        });
      })
      .addCase(fetchUnit.rejected, (state, action) => {
        state.unitLoading = false;
        state.error = action.payload;
      });
  },
});

export const { storeID, getID, clearID } = UnitSlice.actions;
export default UnitSlice.reducer;
