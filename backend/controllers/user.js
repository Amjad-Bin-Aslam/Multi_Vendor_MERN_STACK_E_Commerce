const express = require('express')
const path = require('path')
const User = require('../models/user')
const ErrorHandler = require('../utils/ErrorHandler')

const createUser = async (req, res, next) => {

    try {
        
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({email});

        if(!userEmail){
            return next(new ErrorHandler("User already exist", 400));
        }

        const filename = req.file.filename
        const fileUrl = path.join(filename)

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl
        };

        res.json({ success: true, user })
        console.log(user)

    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err)
    }

}



module.exports = {
    createUser,
}