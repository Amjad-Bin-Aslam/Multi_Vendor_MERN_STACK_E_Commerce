const express = require('express')
const { isSellerAuthenticated } = require('../middlewares/auth')
const { createCouponCode, getAllCoupons } = require('../controllers/couponCodeController')

const couponCodeRouter = express.Router()


// Create Coupon Code APIs
couponCodeRouter.post('/create-coupon-code', isSellerAuthenticated, createCouponCode)
couponCodeRouter.get('/get-all-coupons/:id', isSellerAuthenticated, getAllCoupons)

module.exports = couponCodeRouter