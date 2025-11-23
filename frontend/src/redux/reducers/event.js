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

    // get all events for shop
    .addCase("getAllEventsShopRequest", (state) => {
        state.isLoading = true
    })
    .addCase("getAllEventsShopSuccess", (state,action) => {
        state.isLoading = false
        state.events = action.payload
    })
    .addCase("getAllEventsShopFail", (state,action) => {
        state.isLoading = false
        state.error = action.payload
    })
    
    // delete event shop
    .addCase('deleteEventRequest', (state,action) => {
        state.isLoading = false
    })
    .addCase('deleteEventSucces', (state,action) => {
        state.isLoading = true
        state.message = action.payload
    })
    .addCase('deleteEventFail', (state,action) => {
        state.isLoading = false
        state.error = action.payload
    })
    // get all event for user
    .addCase("getAllEventsRequest", (state) => {
        state.isLoading = true;
    })
    .addCase("getAllEventsSuccess", (state,action) => {
        state.isLoading = false;
        state.allEvents = action.payload;
    })
    .addCase("getAllEventsFail", (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    })
    .addCase("clearError", (state) => {
        state.error = null
    })
})