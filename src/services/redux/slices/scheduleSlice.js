import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentRepository } from "../../repositories/paymentRepository";
import { scheduleRepository } from "../../repositories/scheduleRepository";

export const fetchSchedule = createAsyncThunk(
  "payment/fetchSchedule",
  async (schedule, thunkAPI) => {
    try {
      return await scheduleRepository.fetchSchedule(schedule);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSchedules = createAsyncThunk(
  "payment/fetchSchedules",
  async (page, thunkAPI) => {
    try {
      return await scheduleRepository.fetchPage(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    scheduleLoading: false,
    schedulesLoading: false,
    schedule: {},
    schedules: [],
    scheduleID: null,
    scheduleError: null,
  },
  reducers: {
    saveSchedule: (state, action) => {
      state.scheduleID = action.payload;
      paymentRepository.saveId(action.payload);
    },

    getScheduleId: (state) => {
      state.scheduleID = Number(paymentRepository.getId());
    },

    clearSchedule: (state) => {
      paymentRepository.clearId();
      state.payment = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // ? Fetch all schedules
      .addCase(fetchSchedules.pending, (state) => {
        state.schedulesLoading = true;
        state.paymentError = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.schedulesLoading = false;
        state.schedules = action.payload.data;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.schedulesLoading = false;
        state.paymentError = action.payload;
      })

      // ? Fetch a schedule
      .addCase(fetchSchedule.pending, (state) => {
        state.scheduleLoading = true;
        state.paymentError = null;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.schedule = action.payload;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.paymentError = action.payload;
      })
  },
});

export const { saveSchedule, clearSchedule, getScheduleId } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
