import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applyRepository } from "../../repositories/applyRepository";
import ApplicationAPI from "../../api/ApplicationAPI";

export const fetchApplicants = createAsyncThunk(
  "application/fetchApplicants",
  async (page, thunkAPI) => {
    try {
      return await applyRepository.fetchPage(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCustomers = createAsyncThunk(
  "application/fetchCustomers",
  async (page, thunkAPI) => {
    try {
      return await applyRepository.fetchPage(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLoan = createAsyncThunk(
  "application/fetchLoan",
  async (loan, thunkAPI) => {
    try {
      return await applyRepository.fetchApplication(loan);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
    customers: [],
    loan: {},
    loanLoading: true,
    customLoading: false,
    appsLoading: false,
    pagination: {
      from: 1,
      to: 1,
      currentPage: 1,
      lastPage: 1,
      total: 0,
      nextPage: 2,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ? Fetch all applications
      .addCase(fetchApplicants.pending, (state) => {
        state.appsLoading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.appsLoading = false;
        state.pagination = {
          from: action.payload.from,
          to: action.payload.to,
          currentPage: action.payload.current_page,
          lastPage: action.payload.last_page,
          total: action.payload.total,
        };

        state.applications =
          action.meta.arg.mode === "append"
            ? [...state.applications, ...action.payload.data]
            : action.payload.data;

        state.applications.forEach((app, i) => {
          state.applications[i] = {
            ...app,
            fullName: applyRepository.fullName(app.first_name, app.last_name),
            imgURL: ApplicationAPI.imgPath(app.id_pic),
            isNew: applyRepository.isThisWeek(app.created_at),
            applied_at: applyRepository.dateConvert(app.created_at),
            status: applyRepository.statusBadge(app.apply_status),
          };
        });
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.appsLoading = false;
        state.error = action.payload;
      })

      // ? fetch all customers
      .addCase(fetchCustomers.pending, (state) => {
        state.customLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customLoading = false;
        state.pagination = {
          from: action.payload.from,
          to: action.payload.to,
          currentPage: action.payload.current_page,
          lastPage: action.payload.last_page,
          total: action.payload.total,
        };

        state.customers =
          action.meta.arg.mode === "append"
            ? [...state.customers, ...action.payload.data]
            : action.payload.data;

        const filtered = state.customers
          .filter((f) => f.user && f.user.id)
          .map((app) => ({
            id: app.user.id,
            fullName: applyRepository.fullName(app.first_name, app.last_name),
            imgURL: ApplicationAPI.imgPath(app.id_pic),
            email: app.user.email,
            record_id: app.record_id,
            last_log: applyRepository.dateConvert(app.user.created_at),
          }));

        state.customers = filtered;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.customLoading = false;
        state.error = action.payload;
      })

      // ? Fetch a loan
      .addCase(fetchLoan.pending, (state) => {
        state.loanLoading = true;
        state.error = null;
      })
      .addCase(fetchLoan.fulfilled, (state, action) => {
        state.loanLoading = false;
        state.loan = action.payload;
      })
      .addCase(fetchLoan.rejected, (state, action) => {
        state.loanLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = applicationSlice.actions;
export default applicationSlice.reducer;
