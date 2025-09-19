import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUseCase } from "../../usecases/auth/loginUseCase";
import { authRepository } from "./../../repositories/authRepository";
import { tokenLoginUseCase } from "../../usecases/auth/tokenLoginUseCase";

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
      });
  },
});

export const { logout, clearAuth } = authSlice.actions;
export default authSlice.reducer;
