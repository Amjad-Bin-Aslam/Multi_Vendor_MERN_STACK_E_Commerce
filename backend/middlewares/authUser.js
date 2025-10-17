const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


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
 

module.exports = isAuthenticated;