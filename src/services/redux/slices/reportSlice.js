import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reportRepository } from "../../repositories/reportRepository";

export const submitReport = createAsyncThunk(
  "report/submitReport",
  async (data, thunkAPI) => {
    try {
      return await reportRepository.report(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
    reportLoading: false,
    reportsLoading: false,
    report: {},
    reportError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ? Report an application
      .addCase(submitReport.pending, (state) => {
        state.reportLoading = true;
        state.reportError = null;
      })
      .addCase(submitReport.fulfilled, (state, action) => {
        state.reportLoading = false;
        state.report = action.payload;
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.reportLoading = false;
        state.reportError = action.payload;
      });
  },
});

export const {
  setLoading,
  saveLoan,
  getLoanId,
  calculateStability,
  assessDecision,
  assessResult,
} = reportSlice.actions;
export default reportSlice.reducer;
