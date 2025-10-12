import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentRepository } from "../../repositories/paymentRepository";
import { dashboardRepository } from "../../repositories/dashboardRepository";

export const addPayment = createAsyncThunk(
  "payment/addPayment",
  async (data, thunkAPI) => {
    try {
      return await paymentRepository.pay(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async (payment, thunkAPI) => {
    try {
      return await paymentRepository.fetchPayment(payment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPayments = createAsyncThunk(
  "payment/fetchPayments",
  async (payment, thunkAPI) => {
    try {
      return await paymentRepository.fetchAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const paymentAnalysis = createAsyncThunk(
  "payment/paymentAnalysis",
  async (params, thunkAPI) => {
    try {
      const count = paymentRepository.countPayments(params);

      return count;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentLoading: false,
    paymentsLoading: false,
    paymentResults: {},
    payment: {},
    payments: [],
    paymentID: null,
    paymentError: null,
  },
  reducers: {
    savePayment: (state, action) => {
      state.paymentID = action.payload;
      paymentRepository.saveId(action.payload);
    },

    getPaymentId: (state) => {
      state.paymentID = Number(paymentRepository.getId());
    },

    // ? Dashboard reducers
    paymentDashFilter: (state, action) => {
      const data = action.payload;
      const config = dashboardRepository.makeFilters("status", [
        "on_time",
        "late",
      ]);

      state.paymentResults[data.chart] = dashboardRepository.chartConfig(
        state.paymentResults.data,
        config,
        data.filter
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ? Add a payment
      .addCase(addPayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.payment = action.payload;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      })

      // ? Fetch all payments
      .addCase(fetchPayments.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      })

      // ? Fetch a payment
      .addCase(fetchPayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.payment = action.payload;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      })

      // ? Fetch results
      .addCase(paymentAnalysis.pending, (state) => {
        state.paymentsLoading = true;
        state.paymentError = null;
      })
      .addCase(paymentAnalysis.fulfilled, (state, action) => {
        state.paymentsLoading = false;
        const data = action.payload;
        const paymentSeriesConfig = dashboardRepository.makeFilters("status", [
          "on_time",
          "late",
        ]);

        const chart = dashboardRepository.chartConfig(
          data.data,
          paymentSeriesConfig
        );

        state.paymentResults = { ...data, chart };
      })
      .addCase(paymentAnalysis.rejected, (state, action) => {
        state.paymentsLoading = false;
        state.paymentError = action.payload;
      });
  },
});

export const { savePayment, getPaymentId, paymentDashFilter } = paymentSlice.actions;
export default paymentSlice.reducer;
