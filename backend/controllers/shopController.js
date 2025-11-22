const path = require('path');
const fs = require('fs');
const shopModel = require('../models/shopModel');
const transporter = require('../utils/sendMail');
const jwt = require('jsonwebtoken');
const sendShopToken = require('../utils/shopToken');


// Create shop
const createShop = async (req, res) => {

    try {

        const {email} = req.body;
        const emailLower = String(email).toLowerCase();
        const existingShop = await shopModel.findOne({ email: emailLower })

        // Check if shop exist 
        if(existingShop){
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`
            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        success: false,
                        message: "Error deleting file",
                    })
                }
            })
            return res.json({
                success: false,
                message: "Shop already exist with this email!",
            })
        }


        const filename = req.file.filename
        const fileUrl = path.join(filename)

        const seller = {
            name: req.body.name,
            email: emailLower,
            password: req.body.password,
            avatar: fileUrl,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode, 
        }

        const activationToken = createActivationToken(seller)

        const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: seller.email,
            subject: "Verify your shop!",
            html: `
                <p>Salaam <b>${seller.name}</b>,</p> 
                <p>Click the button below to activate your account:</p>
                <a href="${activationUrl}" 
                style="background:#007bff;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">
                Verify Account
                </a>
                <p>If you didn't request this, you can ignore this email.</p>
            `,
        }
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to email: ${seller.email}`)

        return res.json({
            success: true,
            message: `Please check your email ${seller.email} to verify your shop.`
        })
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!",
      });
    }
} 


// Activate Shop || seller account
const activateShop = async (req, res) => {

    try {
        
        const { activation_token } = req.body;

        const newSeller = jwt.verify(
            activation_token, 
            process.env.ACTIVATION_SECRET)

        if(!newSeller){
            return res.status(400).json({
                success: false,
                message: "Invalid seller token",
            }) 
        }

        // data comes from the verified activation token
        const {name, email, password, avatar, address, phoneNumber, zipCode} = newSeller;

        const normalizedEmail = String(email).toLowerCase()

        // double-check existence using normalized email
        let seller = await shopModel.findOne({ email: normalizedEmail })
        if (seller) {
            return res.status(400).json({
                success: false,
                message: "Shop already exist with this email!"
            })
        }

        // attempt creation and handle duplicate-key race safely
        try {
            seller = await shopModel.create({
                name,
                email: normalizedEmail,
                password,
                avatar,
                address,
                phoneNumber,
                zipCode,
            })
            sendShopToken(seller, res);

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: seller.email,
                subject: "Shop Activated Successfully",
                html: `
                    <h2>Welcome to our E-Commerce Platform, ${seller.name}!</h2>`
            }
            await transporter.sendMail(mailOptions);

        } catch (err) {
            // handle duplicate-key error gracefully
            if (err && err.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'Shop already exists with this email.'
                })
            }
            // rethrow other errors to outer catch
            throw err
        }


    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}


// Shop Login
const shopLogin = async (req, res) => {

    try {
        
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({success: false, message: "Please provide valid email and password!"})
        }

        // Check if shop exist
        const shop = await shopModel.findOne({email}).select("+password");
        if(!shop){
            return res.status(400).json({success: false, message: "Please register your shop first!"})
        }

        // Check if password is correct
        const isPasswordValid = await shop.comparePassword(password)
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: "Please provide correct password!"})
        }

        sendShopToken(shop, res);

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}


// load shop
const loadShop = async (req, res) => {

    try {

        const shop = await shopModel.findById(req.seller.id)

        if(!shop){
            return res.json({ success: false, message: "Shop does not exist." })
        }

        return res.json({ success: true , shop })
        
    } catch (error) {
        
        console.log(error)
        return res.json({ success: false, message: error.message })

    }

}



// Logout the shop
const logoutShop = async (req , res) => {

    try {

       res.cookie("seller_token", null , {
        expires: new Date(Date.now()),
        httpOnly: true,
       }) 

       return res.status(201).json({ success: true , message: "Logged out successfully." })
        
    } catch (error) {
       console.log(error) 
       return res.json({ success: false, message: error.message })
    }
}



// Get shop Info
const getShopInfo = async (req, res) => {
    try {
        
        const shopId = req.params.id
        const shopInfo = await shopModel.findById(shopId)

        return res.json({ success: true, shopInfo })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


// Create activation token
const createActivationToken = (seller) => {
    return jwt.sign(seller , process.env.ACTIVATION_SECRET ,{
        expiresIn: "7d"
    })
}





module.exports = {
    createShop,
    activateShop,
    shopLogin,
    loadShop,
    logoutShop,
    getShopInfo
}