const express = require('express');
const { upload } = require('../middlewares/multer');
const { createShop, activateShop, shopLogin, loadShop, logoutShop, getShopInfo } = require('../controllers/shopController');
const {isSellerAuthenticated} = require('../middlewares/auth');


const shopRouter = express.Router()

// shop APIs
shopRouter.post('/create-shop',upload.single('file'), createShop)
shopRouter.post('/activation', activateShop)
shopRouter.post('/login-shop', shopLogin)
shopRouter.post('/logout-shop', logoutShop)
shopRouter.get('/get-shop-info/:id', getShopInfo)

shopRouter.get('/get-shop', isSellerAuthenticated, loadShop)


module.exports = shopRouter;