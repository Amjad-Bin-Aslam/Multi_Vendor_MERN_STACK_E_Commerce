const express = require('express')
const path = require('path')
const User = require('../models/user')
const validator = require('validator')

const createUser = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            res.json({ success: false, message: "Missing details." })
        }

        if(!validator.isEmail(email)){
            return res.json({ success: false, message: "Enter the valid email." })
        }

        if(password.length < 8){
            return res.json({ success: false, message: "Enter the strong password." })
        }
 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({ success: false, message: "User already exist." })
        }

        const filename = req.file.filename
        const fileUrl = path.join("uploads",filename)

        const userData = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl
        };
        const user = new User(userData)
        await user.save();

        res.json({ success: true, user })
        console.log(user)

    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }

}



module.exports = {
    createUser,
}