import axios from "axios";
import { server } from "../../../server";


//  Create Product of shop
export const createProduct = (newForm) => async (dispatch) => {
 
    try {

        dispatch({
            type: "productCreateRequest"
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post(`${server}/api/product/create-product`, newForm, config)

        dispatch({
            type: "productCreateSuccess",
            payload: data.product
        });

    } catch (error) {
        dispatch({
            type: "productCreateFail",
            payload: error.response?.data?.message || error.message
        })
    }

}



//  get All products of shop
export const getAllProdcutsShop = (id) => async (dispatch) => {

    try {

        dispatch({
            type: "getAllProductsShopRequest",
        })
        
        const { data } = await axios.get(`${server}/api/product/get-all-products-shop/${id}`)

        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: "getAllProductsShopFail",
            payload: error.response.data.message || error.message
        })
    }

}



// delete product of shop
export const deleteShopProduct = (id) => async (dispatch) => {

    try {
        dispatch({
            type: "deleteProductRequest",
        })

        const {data} = await axios.delete(`${server}/api/product/delete-shop-product/${id}`, {
            withCredentials: true
        } )

        dispatch({
            type: "deleteProductSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "deleteProductFail",
            payload: error.response.data.message || error.message
        })
    }

}


// get All products for HomePage
export const getAllProducts = () => async (dispatch) => {
    try {

        dispatch({
            type: "getAllProductsRequest"
        })

        const { data } = await axios.get(`${server}/api/product/get-all-products`)

        dispatch({
            type: "getAllProductsSuccess",
            payload: data.allProducts
        })
        
    } catch (error) {
        dispatch({
            type: "getAllProductsFail",
            payload: error.response.data.message || error.message
        })
    }
}