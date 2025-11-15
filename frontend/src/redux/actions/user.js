import axios from "axios";
import { server } from "../../../server";

// load user
export const loadUser =  () => async (dispatch) => {

    try {
        
        dispatch({
            type: "LoadUserRequest"
        })

        const { data } = await axios.get(`${server}/api/user/load-user`, {withCredentials: true})

        dispatch({
            type: "LoadingUserSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response?.data?.message || error.message
        });
    }
} 


// Load shop
export const loadShop =  () => async (dispatch) => {

    try {
        
        dispatch({
            type: "LoadSellerRequest"
        })

        const { data } = await axios.get(`${server}/api/seller/get-shop`, {withCredentials: true})

        dispatch({
            type: "LoadingSellerSuccess",
            payload: data.shop
        })

    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            payload: error.response?.data?.message || error.message
        });
    }
} 