import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentRepository } from "../../repositories/paymentRepository";
import { dashboardRepository } from "../../repositories/dashboardRepository";
import { creditRepository } from "../../repositories/creditRepository";

export const fetchCredit = createAsyncThunk(
  "credit/fetchCredit",
  async (credit, thunkAPI) => {
    try {
      return await creditRepository.fetchCredit(credit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchScore = createAsyncThunk(
  "credit/fetchScore",
  async (credit, thunkAPI) => {
    try {
      return await creditRepository.fetchScore(credit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCredits = createAsyncThunk(
  "credit/fetchCredits",
  async (credit, thunkAPI) => {
    try {
      return await creditRepository.fetchAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const creditAnalysis = createAsyncThunk(
  "credit/creditAnalysis",
  async (params, thunkAPI) => {
    try {
      const count = creditRepository.countCreditHistory(params);

      return count;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const creditSlic = createSlice({
  name: "credit",
  initialState: {
    creditLoading: false,
    creditsLoading: false,
    creditResult: {},
    credit: {},
    credits: [],
    creditID: null,
    creditError: null,
  },
  reducers: {
    saveCredit: (state, action) => {
      state.creditID = action.payload;
      paymentRepository.saveId(action.payload);
    },

    getCreditId: (state) => {
      state.creditID = Number(paymentRepository.getId());
    },

    clearCredit: (state) => {
      paymentRepository.clearId();
      state.credit = {};
    },

    // ? Dashboard reducers
    creditDashFilter: (state, action) => {
      const data = action.payload;
      const config = dashboardRepository.makeFilters("status", [
        "ongoing",
        "defaulted",
        "paid",
        "late",
      ]);

      state.creditResult[data.chart] = dashboardRepository.chartConfig(
        state.creditResult.data,
        config,
        data.filter
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ? Fetch all history
      .addCase(fetchCredits.pending, (state) => {
        state.creditLoading = true;
        state.creditError = null;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.creditLoading = false;
        state.credits = action.payload;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.creditLoading = false;
        state.creditError = action.payload;
      })

      // ? Fetch a credit history
      .addCase(fetchCredit.pending, (state) => {
        state.creditLoading = true;
        state.creditError = null;
      })
      .addCase(fetchCredit.fulfilled, (state, action) => {
        state.creditLoading = false;
        state.credit = action.payload;
      })
      .addCase(fetchCredit.rejected, (state, action) => {
        state.creditLoading = false;
        state.creditError = action.payload;
      })

      // ? Fetch results
      .addCase(creditAnalysis.pending, (state) => {
        state.creditsLoading = true;
        state.creditError = null;
      })
      .addCase(creditAnalysis.fulfilled, (state, action) => {
        state.creditsLoading = false;
        const data = action.payload;
        const creditSeriesConfig = dashboardRepository.makeFilters("status", [
          "ongoing",
          "defaulted",
          "paid",
          "late",
        ]);

        const chart = dashboardRepository.chartConfig(
          data.data,
          creditSeriesConfig
        );

        state.creditResult = { ...data, chart };
      })
      .addCase(creditAnalysis.rejected, (state, action) => {
        state.creditsLoading = false;
        state.creditError = action.payload;
      });
  },
});

export const { saveCredit, clearCredit, getCreditId, creditDashFilter } =
  creditSlic.actions;
export default creditSlic.reducer;
