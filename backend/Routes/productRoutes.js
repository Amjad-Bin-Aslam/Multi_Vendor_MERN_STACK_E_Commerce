const express =  require('express')
const { createProduct, getAllProdcutsShop } = require('../controllers/productContorller')
const { upload } = require('../middlewares/multer')

const productRouter =  express.Router()


// Ptoduct APIs
productRouter.post('/create-product', upload.array('images'), createProduct) 
productRouter.get('/get-all-products-shop/:id', getAllProdcutsShop)

module.exports = productRouter;