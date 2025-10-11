import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applyRepository } from "../../repositories/applyRepository";
import ApplicationAPI from "../../api/ApplicationAPI";
import { empStabilityUseCase } from "../../usecases/application/empStabilityUseCase";
import { debtStabilityUseCase } from "../../usecases/application/debtStabilityUseCase";
import { ndiStabilityUseCase } from "../../usecases/application/ndiStabilityUseCase";
import { calculateViability } from "../../usecases/application/calculateViability";
import { CATEGORY_RESULTS } from "../../../constants/eligibilityStatus";
import { assignCIUseCase } from "../../usecases/application/assignCIUseCase";
import { dashboardRepository } from "../../repositories/dashboardRepository";

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

export const applicationAnalysis = createAsyncThunk(
  "application/applicationAnalysis",
  async (params, thunkAPI) => {
    try {
      const count = applyRepository.countLoans(params);

      return count;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "application/updateStatus",
  async (data, thunkAPI) => {
    try {
      return data.apply_status === "accepted"
        ? await assignCIUseCase(data)
        : await applyRepository.patch(data, data.id);
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
    loanResults: {},
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
    stability: {
      employment: null,
      debt: null,
      ndi: null,
    },
    loanResult: {
      employment: {},
      debt: {},
      ndi: {},
    },
    loanDecision: "review",
    applyError: null,
  },
  reducers: {
    setLoanLoad: (state, action) => {
      state.loanLoading = action.payload;
    },

    saveLoan: (state, action) => {
      state.loanID = action.payload;
      applyRepository.saveId(action.payload);
    },

    getLoanId: (state) => {
      state.loanID = Number(applyRepository.getId());
    },

    clearLoan: (state) => {
      state.loanID = null;
      applyRepository.clearId();
    },

    calculateStability: (state, action) => {
      const data = action.payload;

      state.stability.debt = debtStabilityUseCase(data.dti);
      state.stability.ndi = ndiStabilityUseCase(data.ndi, data.emi);
      state.stability.employment = empStabilityUseCase(
        state.loan.rate,
        state.loan.yrs_in_service
      );
    },

    assessDecision: (state) => {
      const stability = state.stability;
      const counts = { green: 0, red: 0, yellow: 0 };

      for (let val of [stability.employment, stability.debt, stability.ndi]) {
        counts[val]++;
      }

      state.loanDecision = calculateViability(counts);
    },

    assessResult: (state) => {
      ["employment", "debt", "ndi"].forEach((category) => {
        const color = state.stability[category];

        if (!color || !CATEGORY_RESULTS[category])
          state.loanResult[category] = {};

        state.loanResult[category] = CATEGORY_RESULTS[category][color];
      });
    },

    // ? Dashboard reducers
    selectDate: (state, action) => {}
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

        if (Object.keys(data).length > 0) {
          state.loan = {
            ...data,
            civil_stat: data.status,
            fullName: applyRepository.fullName(data.first_name, data.last_name),
            imgURL: ApplicationAPI.imgPath(data.id_pic),
            status: applyRepository.statusBadge(data.apply_status),
            parsedSalary: `₱${parseFloat(data.salary).toLocaleString()}`,
          };
        } else state.loan = {};
      })
      .addCase(fetchLoan.rejected, (state, action) => {
        state.loanLoading = false;
        state.loan = {};
        state.applyError = action.payload;
      })

      // ? Fetch results
      .addCase(applicationAnalysis.pending, (state) => {
        state.appsLoading = true;
        state.error = null;
      })
      .addCase(applicationAnalysis.fulfilled, (state, action) => {
        state.appsLoading = false;
        const data = action.payload;
        const analyticsConfig = [
          {
            name: "Pending",
            filter: (app) => app.apply_status === "pending",
          },
          {
            name: "Accepted",
            filter: (app) => app.apply_status === "accepted",
          },
          {
            name: "Denied",
            filter: (app) => app.apply_status === "denied",
          },
          {
            name: "Evaluated",
            filter: (app) => app.apply_status === "evaluated",
          },
          {
            name: "Approved",
            filter: (app) => app.apply_status === "approved",
          },
          {
            name: "Declined",
            filter: (app) => app.apply_status === "declined",
          },
        ];

        const donut = dashboardRepository.countSlice(data, [
          "paid",
          "canceled",
          "evaluated",
        ]);
        const progress = dashboardRepository.countSlice(data, undefined, true);
        const line = dashboardRepository.chartConfig(data.data);
        const barChart = dashboardRepository.chartConfigMulti(
          data.data,
          analyticsConfig
        );
        state.loanResults = { ...data, donut, line, progress, barChart };
      })
      .addCase(applicationAnalysis.rejected, (state, action) => {
        state.appsLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setLoanLoad,
  saveLoan,
  getLoanId,
  clearLoan,
  calculateStability,
  assessDecision,
  assessResult,
} = applicationSlice.actions;
export default applicationSlice.reducer;
