import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUnitUseCase } from "../../usecases/unit/addUnitUseCase";
import { unitRepository } from "../../repositories/unitRepository";
import UnitAPI from "../../api/UnitAPI";
import { MOTOR_BRANDS } from "../../../constants/brands";
import { editUnitUseCase } from "../../usecases/unit/editUnitUseCase";

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

export const editUnit = createAsyncThunk(
  "unit/editUnit",
  async (unit, thunkAPI) => {
    try {
      return await editUnitUseCase(unit);
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
  async (unitID, thunkAPI) => {
    try {
      const id = unitID ? unitID : unitRepository.getId();
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
    brands: MOTOR_BRANDS,
  },
  reducers: {
    storeID: (state, action) => {
      unitRepository.saveId(action.payload);
    },

    clearID: (state) => {
      unitRepository.clearId();
    },
  },
  extraReducers: (builder) => {
    builder
      // ? Create a unit
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

      // ? Edit a unit
      .addCase(editUnit.pending, (state) => {
        state.unitLoading = true;
        state.error = null;
      })
      .addCase(editUnit.fulfilled, (state, action) => {
        state.unitLoading = false;
        state.unit = action.payload;
      })
      .addCase(editUnit.rejected, (state, action) => {
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

        state.unit.images.forEach((file, i) => {
          state.images[i] = UnitAPI.imgPath(file.path);
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
