const express = require('express')
const { isSellerAuthenticated } = require('../middlewares/auth')
const { createCouponCode, getAllCoupons, deleteCouponCode, getCouponCodeValue } = require('../controllers/couponCodeController')

const couponCodeRouter = express.Router()


// Create Coupon Code APIs
couponCodeRouter.post('/create-coupon-code', isSellerAuthenticated, createCouponCode)
couponCodeRouter.get('/get-all-coupons/:id', isSellerAuthenticated, getAllCoupons)
couponCodeRouter.delete('/delete-coupon-code/:id', isSellerAuthenticated, deleteCouponCode)
couponCodeRouter.get('/get-coupon-code-value/:name', getCouponCodeValue)

module.exports = couponCodeRouter 