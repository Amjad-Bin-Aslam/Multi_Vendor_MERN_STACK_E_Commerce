const express =  require('express')
const { createProduct, getAllProductsShop, deleteShopProduct, getAllProducts } = require('../controllers/productContorller')
const { upload } = require('../middlewares/multer')
const { isSellerAuthenticated } = require('../middlewares/auth')

const productRouter =  express.Router() 


// Ptoduct APIs
productRouter.post('/create-product', upload.array('images'), createProduct) 
productRouter.get('/get-all-products-shop/:id', getAllProductsShop)
productRouter.delete('/delete-shop-product/:id', isSellerAuthenticated, deleteShopProduct)

// get all Products for HomePage
productRouter.get('/get-all-products', getAllProducts)


module.exports = productRouter;