import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRepository } from "../../repositories/userRepository";
import { addUserUseCase } from "../../usecases/user/addUserUseCase";
import { registerUseCase } from "../../usecases/user/registerUseCase";

export const addUser = createAsyncThunk(
  "user/addUser",
  async (unit, thunkAPI) => {
    try {
      return await addUserUseCase(unit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      return await registerUseCase(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (page, thunkAPI) => {
    try {
      return await userRepository.fetchPage(page)
        // : await userRepository.fetchAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
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
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
      })

      // ? Register an applicant
      .addCase(registerUser.pending, (state) => {
        state.usersLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.usersLoading = false;

        state.users = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
