import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupRequest: (state, action) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signinRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    loadUserRequest: (state, action) => {
     //nothing
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutRequest: (state, action) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    emailVarificationRequest: (state, action) => {
      state.loading = true;
    },
    emailVarificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    emailVarificationFailure: (state, action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    loginWithGoogle: (state, action) => {
      state.user = action.payload;
    },
    clearMessage: (state, action) => {
      state.message = null;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFailure,
  signinRequest,
  signinSuccess,
  signinFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  emailVarificationRequest,
  emailVarificationSuccess,
  emailVarificationFailure,
  loginWithGoogle,
  clearError,
  clearMessage,
} = authSlice.actions;
