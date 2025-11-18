import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUseCase } from "../../usecases/auth/loginUseCase";
import { authRepository } from "./../../repositories/authRepository";
import { tokenLoginUseCase } from "../../usecases/auth/tokenLoginUseCase";
import { userRepository } from "../../repositories/userRepository";
import { changePassUseCase } from "../../usecases/auth/changePassUseCase";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      return await loginUseCase(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (password, thunkAPI) => {
    try {
      return await changePassUseCase(password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAccount = createAsyncThunk(
  "auth/fetchAccount",
  async (id, thunkAPI) => {
    try {
      return await userRepository.fetchAccount(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserWithToken = createAsyncThunk(
  "auth/loginUserWithToken",
  async (thunkAPI) => {
    try {
      return await tokenLoginUseCase();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    profile: {},
    token: null,
    isAuthenticated: false,
    authorized: false,
    loggedOut: false,
    authLoading: true,
    error: null,
  },
  reducers: {
    logout: (state) => {
      authRepository.clearToken();
      state.isAuthenticated = false;
      state.user = null;
      state.loggedOut = true;
    },

    getToken: (state) => {
      state.token = authRepository.getToken();
    },

    clearAuth: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.authorized = false;
      state.loggedOut = false;
      state.authLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ? Login
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
        state.initialized = true;
      })

      // ? loginUserWithToken
      .addCase(loginUserWithToken.pending, (state) => {
        state.authLoading = { isActive: true, text: "Loading..." };
        state.error = null;
      })
      .addCase(loginUserWithToken.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(loginUserWithToken.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
        state.initialized = true;
      })

      // ? Fetch an account
      .addCase(fetchAccount.pending, (state) => {
        state.authLoading = { isActive: true, text: "Loading..." };
        state.error = null;
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.authLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuth, getToken } = authSlice.actions;
export default authSlice.reducer;
