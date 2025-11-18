const productModel = require("../models/productModel")
const shopModel = require("../models/shopModel")


// Create Product
const createProduct = async (req , res) => {

    try {

        const shopId = req.body.shopId
        const shop = await shopModel.findById(shopId)
        
        if(!shop){
            return res.json({ success: false , message: "Shop id is invalid!" }) 
        } else {
            const files = req.files || []
            const imageUrls = files.map((file) => `${file.filename}` || file.originalname)
            const productData = req.body
            productData.images = imageUrls
            productData.shop = shop
            // productData.shopId = shopId
            // // ensure sold_out is set if client didn't provide it (model also has a default)
            // if (productData.sold_out === undefined) productData.sold_out = 0

            const product = await productModel.create(productData)

            return res.status(201).json({
                success: true,
                message: "Product Created Successfully!",
                product
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })
    }

}


// get all products 
const getAllProdcutsShop = async (req , res) => {

    try {

        const shopId = req.params.id 
        const products = await productModel.find({shopId})

        // const products = await productModel.find({shopId: req.params.id})

        return res.status(201).json({ success: true, products })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false , message: error.message })
    }
}  


module.exports = {
    createProduct,
    getAllProdcutsShop
}