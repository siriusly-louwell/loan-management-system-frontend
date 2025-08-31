import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAPI from "../../api/UserAPI";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await UserAPI.login(credentials);

      if (!response) {
        throw new Error("Login failed");
      }

      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserWithToken = createAsyncThunk(
  "auth/loginUserWithToken",
  async (token, thunkAPI) => {
    try {
      const response = await UserAPI.fetchUser(token);
      
      if (!response) throw new Error("Token invalid");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    response: {},
    loading: true,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.response = null;
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
        state.response = action.payload;
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
        state.response = action.payload;
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
