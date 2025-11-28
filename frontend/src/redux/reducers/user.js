import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
      if (state.user) {
        state.isAuthenticated = true;
      }
    })
    .addCase("LoadingUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    // Logout user state clear
    .addCase('logoutUser', (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    })
    //  update user Profile
    .addCase("updateUserInfoRequest", (state,action) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state,action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFail", (state,action) => {
      state.loading = false;
      state.error = action.payload
    })
    // update user address
    .addCase("updateUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.user = action.payload.user;
      state.successMessage = action.payload.successMessage;
    })
    .addCase("updateUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    // delete user address
    .addCase("deleteUserAddressRequest", (state,action) => {
      state.addressLoading = true;
    })
    .addCase("deleteUserAddressSuccess", (state,action) => {
      state.addressLoading = false;
      state.user = action.payload.user;
      state.successMessage = action.payload.successMessage;
    })
    .addCase("deleteUserAddressFail", (state,action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.error = null;
      state.successMessage = null;
    });
});


