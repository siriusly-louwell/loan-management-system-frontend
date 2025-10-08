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
  async (page, thunkAPI) => {
    try {
      return page?.page || page?.min
        ? await unitRepository.fetchPage(page)
        : await unitRepository.fetchAll(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unitAnalysis = createAsyncThunk(
  "unit/unitAnalysis",
  async (params, thunkAPI) => {
    try {
      const count = unitRepository.countUnits();

      return count;
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
    unitsLoading: false,
    images: [],
    error: null,
    brands: MOTOR_BRANDS,
    pagination: {
      from: 1,
      to: 1,
      currentPage: 1,
      lastPage: 1,
      total: 0,
      nextPage: 2,
    },
  },
  reducers: {
    storeID: (state, action) => {
      unitRepository.saveId(action.payload);
    },

    clearID: (state) => {
      unitRepository.clearId();
    },

    clearUnit: (state) => {
      state.unit = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // ? Create a unit
      .addCase(addUnit.pending, (state) => {
        state.unitLoading = { isActive: true, text: "Saving data..." };
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
        state.pagination = {
          from: action.payload.from,
          to: action.payload.to,
          currentPage: action.payload.current_page,
          lastPage: action.payload.last_page,
          total: action.payload.total,
        };

        state.units = action.meta.arg.ndi
          ? action.payload
          : action.meta.arg.mode === "append"
          ? [...state.units, ...action.payload.data]
          : action.payload.data;
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

        state.images = [];
        state.unit.images.forEach((file, i) => {
          state.images[i] = {
            url: UnitAPI.imgPath(file.path),
            type: file.image_type,
          };
        });
      })
      .addCase(fetchUnit.rejected, (state, action) => {
        state.unitLoading = false;
        state.error = action.payload;
      });
  },
});

export const { storeID, getID, clearID, clearUnit } = UnitSlice.actions;
export default UnitSlice.reducer;
