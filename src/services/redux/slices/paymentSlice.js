import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentRepository } from "../../repositories/paymentRepository";

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

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentLoading: false,
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

      // ? Fetch a payment
      .addCase(fetchPayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.report = action.payload;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      });
  },
});

export const { save } = paymentSlice.actions;
export default paymentSlice.reducer;
