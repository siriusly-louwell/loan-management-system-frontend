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
    loanID: null,
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
    applyError: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loanLoading = action.payload;
    },

    saveLoan: (state, action) => {
      applyRepository.saveId(action.payload);
    },

    getLoanId: (state, action) => {
      state.loanID = applyRepository.getId();
    }
  },
  extraReducers: (builder) => {
    builder
      // ? Fetch all applications
      .addCase(fetchApplicants.pending, (state) => {
        state.appsLoading = true;
        state.applyError = null;
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
        state.applyError = action.payload;
      })

      // ? fetch all customers
      .addCase(fetchCustomers.pending, (state) => {
        state.customLoading = true;
        state.applyError = null;
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
            app_id: app.id,
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
        state.applyError = action.payload;
      })

      // ? Fetch a loan
      .addCase(fetchLoan.pending, (state) => {
        state.loanLoading = true;
        state.applyError = null;
      })
      .addCase(fetchLoan.fulfilled, (state, action) => {
        state.loanLoading = false;
        const data = action.payload;

        if (Object.keys(data).length > 0)
          state.loan = {
            ...data,
            civil_stat: data.status,
            fullName: applyRepository.fullName(data.first_name, data.last_name),
            imgURL: ApplicationAPI.imgPath(data.id_pic),
            status: applyRepository.statusBadge(data.apply_status),
            parsedSalary: `₱${parseFloat(data.salary).toLocaleString()}`,
          };
        else state.loan = {};
      })
      .addCase(fetchLoan.rejected, (state, action) => {
        state.loanLoading = false;
        state.load = {};
        state.applyError = action.payload;
      });
  },
});

export const { setLoading, saveLoan } = applicationSlice.actions;
export default applicationSlice.reducer;
