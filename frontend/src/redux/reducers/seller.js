import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  shop: null,
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadingSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.shop = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })   
    .addCase("clearError", (state) => {
      state.error = null;
    });
});


