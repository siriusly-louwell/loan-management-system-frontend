import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applyRepository } from "../../repositories/applyRepository";
import ApplicationAPI from "../../api/ApplicationAPI";

export const fetchApplicants = createAsyncThunk(
  "application/fetchApplicants",
  async (page, thunkAPI) => {
    try {
      return page?.page || page?.min
        ? await applyRepository.fetchPage(page)
        : await applyRepository.fetchAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
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
      });
  },
});

// export const {} = applicationSlice.actions;
export default applicationSlice.reducer;
