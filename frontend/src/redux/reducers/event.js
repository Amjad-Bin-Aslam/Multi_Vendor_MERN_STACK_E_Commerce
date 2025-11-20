import { createReducer } from "@reduxjs/toolkit";

const initialState  = {
    isLoading: false
}

export const eventReducer = createReducer(initialState, (builder) => {
    builder
    // Create event
    .addCase("eventCreateRequest", (state) => {
        state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state,action) => {
        state.isLoading = false;
        state.event = action.payload;
        state.success = true
    })
    .addCase("eventCreateReset", (state,action) => {
        state.isLoading = false;
        state.event = null;
        state.success = false
    })
    .addCase("eventCreateFail", (state,action) => {
        state.isLoading = false;
        state.error =  action.payload
    })

    // get all events
    .addCase("getAllEventsShopRequest", (state) => {
        state.isLoading = true
    })
    .addCase("getAllEventsShopSuccess", (state,action) => {
        state.isLoading = false
        state.events = action.payload
    })
    .addCase("getAllEventsShopFail" , (state,action) => {
        state.isLoading = false
        state.error = action.payload
    })
    .addCase("clearError", (state) => {
        state.error = null
    })
})