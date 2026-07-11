import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logout, verifySession } from "./authThunks";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        console.log(action.payload);
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })

      // verify Session
      .addCase(verifySession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifySession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isInitialized = true;
      })
      .addCase(verifySession.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isInitialized = true;
      })

      // Log out
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      }),
});

export default authSlice.reducer;
