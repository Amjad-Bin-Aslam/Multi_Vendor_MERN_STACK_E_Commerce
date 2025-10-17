const express = require('express')
const path = require('path')
const validator = require('validator')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const transporter = require('../utils/sendMail')
const userModel = require('../models/userModel')
const sendToken = require('../utils/jwtToken')



const createUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details." })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter the valid email." })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter the strong password." })
        }

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(err)
                    return res.json({ success: false, message: "Error deleting the file." })
                }
            })
        }

        const filename = req.file.filename
        const fileUrl = path.join("uploads", filename)

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: {
                public_id: filename,
                url: fileUrl
            }
        };


        const activationToken = createActivationToken(user)
        const activationUrl = `http://localhost:5173/activation/${activationToken}`

        // Send verification email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify your account",
            html: `
                <p>Salaam <b>${user.name}</b>,</p> 
                <p>Click the button below to activate your account:</p>
                <a href="${activationUrl}" 
                style="background:#007bff;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">
                Verify Account
                </a>
                <p>If you didn't request this, you can ignore this email.</p>
            `,
        };
        await transporter.sendMail(mailOptions);
        console.log("verification email send to email:", user.email)

        return res.status(200).json({
            success: true,
            message: `Please check your email ${user.email} to verify your account.`,
        });

    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }

} 



// activate user
const activateUser = async (req, res) => {
    try { 
        
        const { activation_token } = req.body;

        const newUser = jwt.verify(activation_token , process.env.ACTIVATION_SECRET)
        if(!newUser){
            return res.json({ success: false, message: "Invalisd token" })
        }

        const { name, email, password, avatar} = newUser

        let user = await userModel.findOne({email})
        if(user){
            return res.json({ success: false, message: "User already exist." })
        } 

        user = await userModel.create({
            name,
            email, 
            password,
            avatar 
        })
    
        sendToken(user, res); 
  
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}




// creating the token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "10m"
    })
}



module.exports = {
    createUser,
    activateUser,
}