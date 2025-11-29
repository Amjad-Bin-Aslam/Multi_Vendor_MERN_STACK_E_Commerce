const couponCodeModel = require("../models/couponCodeModel")


// create couponCode
const createCouponCode = async (req, res) => {
    try {
        
        const isCouponCodeExist = await couponCodeModel.find({ 
            name: req.body.name 
        })

        if(isCouponCodeExist.length !== 0 ){
            return res.json({ success: false, message: "Coupn code already exist!" })
        }

        const couponCode = await couponCodeModel.create(req.body)

        return res.json({ success: true, message: "Coupon code created successfully!", couponCode })

    } catch (error) {
       console.log(error) 
       return res.json({ success: false, message: error.message })
    }
}



// Get All coupon Codes from shop
const getAllCoupons = async (req , res) => {

    try {

        const shopId = req.params.id
        if (!shopId) return res.status(400).json({ success: false, message: 'Shop id is required' })

        // query by possible shop shapes: either nested object with _id or raw shop id
        const couponCodes = await couponCodeModel.find({
            $or: [ { 'shop._id': shopId }, { shop: shopId } ]
        })

        return res.json({ success: true, couponCodes })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}



// delete coupon code
const deleteCouponCode = async (req, res) => {

    try {

        const couponCodeId = req.params.id

        const couponCode = await couponCodeModel.findByIdAndDelete(couponCodeId)
        if(!couponCode){
            return res.json({success: false, message: "Coupon code not found!"})
        }

        return res.json({
            success: true,
            message: "Coupon code deleted successfully!",
        })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}


// get coupon code by value
const getCouponCodeValue = async (req, res) => {

    try {

        const name = req.params.name

        const couponCode = await couponCodeModel.findOne({name})
        return res.json({ success: true, couponCode })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}


module.exports = {
    createCouponCode,
    getAllCoupons,
    deleteCouponCode,
    getCouponCodeValue
}