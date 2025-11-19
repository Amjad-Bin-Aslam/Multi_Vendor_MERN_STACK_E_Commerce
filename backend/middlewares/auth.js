const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const shopModel = require('../models/shopModel');



// user authentication middleware
const isAuthenticated = async (req , res , next) => {
     
    try { 
         
        const { token } = req.cookies;
    if(!token){
        return res.json({ success: false, message: "Please login to continue." }) 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await userModel.findById(decoded.id)

    next();

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}



// seller authentication middleware
const isSellerAuthenticated = async (req , res , next) => {
      
    try { 
         
    const { seller_token } = req.cookies;
    
    if(!seller_token){
        return res.json({ success: false, message: "Please login to continue." }) 
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY)

    req.seller = await shopModel.findById(decoded.id)

    next();

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
 

module.exports = {
    isAuthenticated,
    isSellerAuthenticated
};