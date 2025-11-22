import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allProducts: [],
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
  // create product of shop
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })   
    .addCase("productCreateReset", (state) => {
      state.success = false;
      state.product = null;
    })
    //  get all products of shop
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state,action) => {
      state.isLoading = false;
      state.products = action.payload
    })
    .addCase("getAllProductsShopFail", (state,action) => {
      state.isLoading = false;
      state.error = action.payload
    })
    // delete shop product
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true
    })
    .addCase("deleteProductSuccess", (state,action) => {
      state.isLoading = false,
      state.message = action.payload
    })
    .addCase("deleteProductFail", (state,action) => {
      state.isLoading = false,
      state.error = action.payload
    })
    // get all products for homepage
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload; 
    })
    .addCase("getAllProductsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })  
    .addCase("clearError", (state) => {
      state.error = null;
    });
});


