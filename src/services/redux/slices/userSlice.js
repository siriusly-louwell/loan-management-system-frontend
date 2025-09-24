import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRepository } from "../../repositories/userRepository";
import UserAPI from "../../api/UserAPI";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (page, thunkAPI) => {
    try {
      return page?.page || page?.min
        ? await userRepository.fetchPage(page)
        : await userRepository.fetchAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const useSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    usersLoading: false,
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
      // ? Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.pagination = {
          from: action.payload.from,
          to: action.payload.to,
          currentPage: action.payload.current_page,
          lastPage: action.payload.last_page,
          total: action.payload.total,
        };

        state.users =
          action.meta.arg.mode === "append"
            ? [...state.users, ...action.payload.data]
            : action.payload.data;

        state.users.forEach((app, i) => {
          state.users[i] = {
            ...app,
            imgURL: UserAPI.imgPath(app.id_pic),
            isNew: userRepository.isThisWeek(app.created_at),
            applied_at: userRepository.dateConvert(app.created_at),
            status: userRepository.statusBadge(app.apply_status),
          };
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = useSlice.actions;
export default useSlice.reducer;
