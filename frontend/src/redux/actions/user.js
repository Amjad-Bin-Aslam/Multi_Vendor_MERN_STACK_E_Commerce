import axios from "axios";
import { server } from "../../../server";

// load user
export const loadUser =  () => async (dispatch) => {

    try {
        
        dispatch({
            type: "LoadUserRequest"
        })

        const { data } = await axios.get(`${server}/api/user/load-user`, {withCredentials: true})

        if (data.success === false || !data.user) {
            dispatch({
                type: "LoadUserFail",
                payload: data.message || "Authentication failed"
            });
        } else {
            dispatch({
                type: "LoadingUserSuccess",
                payload: data.user
            })
        }

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

        if (data.success === false || !data.shop) {
            dispatch({
                type: "LoadSellerFail",
                payload: data.message || "Shop authentication failed"
            });
        } else {
            dispatch({
                type: "LoadingSellerSuccess",
                payload: data.shop 
            })
        }

    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            payload: error.response?.data?.message || error.message
        });
    }
} 


// update user Information
export const updateUserInformation = (name,email,phoneNumber,password) => async (dispatch) => {
    
    try {

        dispatch({
        type: "updateUserInfoRequest"
    })

    const { data } = await axios.put(`${server}/api/user/update-user-info`, {
        name,
        email,
        phoneNumber,
        password
    } , {withCredentials: true})

    dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user
    })
        
    } catch (error) {
        
        dispatch({
            type: "updateUserInfoFail",
            payload: error.response?.data?.message || error.message
        })

    } 

}



// update user address
export const updateUserAddress = (country,state,city,address1,address2,zipCode,addressType) => async (dispatch) => {

    try {

        dispatch({
            type: "updateUserAddressRequest"
        })

        const { data } = await axios.put(`${server}/api/user/update-user-address`,{
            country,
            state,
            city,
            address1,
            address2,
            zipCode,
            addressType
        }, { withCredentials: true })

        if (data.success === false) {
            dispatch({
                type: "updateUserAddressFail",
                payload: data.message
            })
        } else {
            dispatch({
                type: "updateUserAddressSuccess",
                payload: {
                    successMessage: "Address updated successfully!",
                    user: data.user
                }
            })
        }
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: "updateUserAddressFail",
            payload: error.response?.data?.message || error.message
        })
    }

}



// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {

   try {

     dispatch({
        type: "deleteUserAddressRequest"
    })
    
    const { data } = await axios.delete(`${server}/api/user/delete-user-address/${id}`, { withCredentials: true })

    dispatch({
        type: "deleteUserAddressSuccess",
        payload: {
            successMessage: "Address deleted successfully!",
            user: data.user
        }
    })

   } catch (error) {
    dispatch({
        type: "deleteUserAddressFail",
        payload: error.response?.data?.message || error.message
    })
   }

}