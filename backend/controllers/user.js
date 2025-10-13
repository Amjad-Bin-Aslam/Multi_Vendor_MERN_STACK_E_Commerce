const express = require('express')
const path = require('path')
const router = express.Router()
const {upload} = require('../middlewares/multer')
const User = require('../models/user')
const ErrorHandler = require('../utils/ErrorHandler')

router.post('/create-user', upload.single('file'), async (req, res, next) => {

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

        console.log(user)

    } catch (err) {
        console.log(err)
    }

})