import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUseCase } from "../../usecases/auth/loginUseCase";
import { tokenLoginUseCase } from "../../usecases/auth/tokenLoginUseCase";
import { authRepository } from "./../../repositories/authRepository";

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
  async (token, thunkAPI) => {
    try {
      // return await authRepository.tokenLogin(token);
      return await tokenLoginUseCase(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    // response: {},
    user: {},
    loggedOut: false,
    loading: true,
    error: null,
  },
  reducers: {
    logout: (state) => {
      authRepository.clearToken();
      state.isAuthenticated = false;
      //state.response = null;
      state.user = null;
      state.loggedOut = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        //state.response = action.payload;
        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      })

      // ? loginUserWithToken
      .addCase(loginUserWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserWithToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        //state.response = action.payload;
        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(loginUserWithToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
