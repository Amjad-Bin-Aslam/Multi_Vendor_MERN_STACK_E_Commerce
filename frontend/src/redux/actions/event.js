import axios from "axios"
import { server } from "../../../server"



// Create Product
export const createEvent = (newForm) => async (dispatch) => {

    try {

        dispatch({
            type: "eventCreateRequest"
        })

        const config = { headers: { "Content-Type":"multipart/form-data" } }
        
        const { data } = await axios.post(`${server}/api/event/create-event`, newForm, config)

        dispatch({
            type: "eventCreateSuccess",
            payload: data.event
        })

    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response?.data?.message || error.message
        })
    }

}


// get all events shop
export const getAllEventsShop = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "getAllEventsShopRequest",
        })
        
        const { data } = await axios.get(`${server}/api/event/get-all-events-shop/${id}`) 

        dispatch({
            type: "getAllEventsShopSuccess",
            payload: data.events
        })

    } catch (error) {
        dispatch({
            type: "getAllEventsShopFail",
            payload: error.response.data.message || error.message
        })
    }

}


// delete Event from shop
export const deleteEventShop = (id) => async (dispatch) => {
    try {
        
        dispatch({
            type: "deleteEventRequest"
        })

        const { data } = await axios.delete(`${server}/api/event/delete-event-shop/${id}`, { withCredentials:true })

        dispatch({
            type: "deleteEventSucces",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "deleteEventFail",
            payload: error.response.data.messaga || error.message
        })
    }
}