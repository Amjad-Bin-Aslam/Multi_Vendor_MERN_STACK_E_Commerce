const express =  require('express')
const { createProduct, getAllProdcutsShop, deleteShopProduct } = require('../controllers/productContorller')
const { upload } = require('../middlewares/multer')
const { isSellerAuthenticated } = require('../middlewares/auth')

const productRouter =  express.Router()


// Ptoduct APIs
productRouter.post('/create-product', upload.array('images'), createProduct) 
productRouter.get('/get-all-products-shop/:id', getAllProdcutsShop)
productRouter.delete('/delete-shop-product/:id', isSellerAuthenticated, deleteShopProduct)

module.exports = productRouter;