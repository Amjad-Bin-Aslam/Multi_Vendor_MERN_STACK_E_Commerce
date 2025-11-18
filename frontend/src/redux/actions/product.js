import axios from "axios";
import { server } from "../../../server";


//  Create Product
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



//  get All products
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