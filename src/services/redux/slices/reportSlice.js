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

export const fetchReport = createAsyncThunk(
  "report/fetchReport",
  async (report, thunkAPI) => {
    try {
      return await reportRepository.fetchReport(report);
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
    reportID: null,
    reportError: null,
  },
  reducers: {
    saveReport: (state, action) => {
      state.reportID = action.payload;
      reportRepository.saveId(action.payload);
    },

    getReportId: (state) => {
      state.reportID = Number(reportRepository.getId());
    },

    clearReport: (state) => {
      reportRepository.clearId();
      state.report = {};
    },
  },
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
      })

      // ? Fetch a report
      .addCase(fetchReport.pending, (state) => {
        state.reportLoading = true;
        state.reportError = null;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.reportLoading = false;
        state.report = action.payload;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.reportLoading = false;
        state.reportError = action.payload;
      });
  },
});

export const { saveReport, getReportId, clearReport } = reportSlice.actions;
export default reportSlice.reducer;
