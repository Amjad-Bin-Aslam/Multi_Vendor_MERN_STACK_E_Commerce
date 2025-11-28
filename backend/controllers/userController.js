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
                if (err) {
                    console.log(err)
                    return res.json({ success: false, message: "Error deleting the file." })
                }
            })
            return res.json({ success: false, message: "User already exist!" })
        }

        const filename = req.file.filename
        const fileUrl = `uploads/${filename}`

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

        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET)
        if (!newUser) {
            return res.json({ success: false, message: "Invalisd token" })
        }

        const { name, email, password, avatar } = newUser

        let user = await userModel.findOne({ email })
        if (user) {
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



// login user
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Mssing details." })
        }

        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist!" })
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Please provide correct informaton." })
        }

        sendToken(user, res)

    } catch (error) {
        console.log(error)
        return res.json({ sucess: false, message: error.message })
    }

}



// load user 
const loadUser = async (req, res) => {

    try {

        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist!" })
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}


// Logout user
const logoutUser = async (req, res) => {

    try {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        return res.status(201).json({ success: true, message: "Logged out successfully." })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}



// update User Information
const updateUserInformation = async (req, res) => {

    try {

        const { email, password, phoneNumber, name } = req.body;

        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            return res.json({ success: false, message: "User does not exist!" })
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Please provide correct information!" })
        }

        user.name = name || user.name
        user.phoneNumber = phoneNumber || user.phoneNumber
        user.email = email || user.email

        await user.save()

        return res.status(200).json({
            success: true,
            message: "User information updated successfully.",
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }

}


// update user avatar
const updateUserAvatar = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        const userId = req.user.id;
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        try {
            if (existingUser.avatar && existingUser.avatar.public_id) {
                const previousPath = `uploads/${existingUser.avatar.public_id}`;
                if (fs.existsSync(previousPath)) {
                    fs.unlinkSync(previousPath);
                }
            }
        } catch (cleanupErr) {
            console.log("Avatar cleanup error:", cleanupErr);
        }

        const filename = req.file.filename;
        const fileUrl = `uploads/${filename}`;

        existingUser.avatar = {
            public_id: filename,
            url: fileUrl
        };
        await existingUser.save();

        return res.status(200).json({
            success: true,
            message: "Avatar updated successfully.",
            user: existingUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}


// update user address
const updateUserAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const user = await userModel.findById(userId)

        const sameTypeAddress = user.addresses.find((address) => address.addressType === req.body.addressType)
        if (sameTypeAddress) {
            return res.json({ success: false, message: `${req.body.addressType} address already exists.` })
        }

        const exitAddress = user.addresses.find((address) => address._id = req.body._id)
        if (exitAddress) {
            Object.assign(exitAddress, req.body)
        } else {
            user.addresses.push(req.body)
        }

        await user.save()

        return res.json({ success: true, message: "Address added successfully.", user })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}



// delete user address
const deleteUserAddress = async (req, res) => {

    try {

        const userId = req.user.id
        const addressId = req.params.id

        const user = await userModel.updateOne({ _id: userId }, {
            $pull: { addresses: { _id: addressId } }
        })

        return res.json({ success: true, message: "Address deleted successfully.", user })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}


// change the user password
const changeUserPassword = async (req, res) => {

    try {

        const userId = req.user.id
        const user = await userModel.findById(userId).select("+password")

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
        if(!isPasswordMatched){
            return res.json({ success: false, message: "Please provide the correct old password!" })
        }

        if(req.body.newPassword !== req.body.confirmPassword){
            return res.json({ success: false, message: "New password and confirm password do not match." })
        }

        user.password = req.body.newPassword

        await user.save()

        return res.json({ success: true, message: "Password updated successfully." })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}


// creating the token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "7d"
    })
}



module.exports = {
    createUser,
    activateUser,
    loginUser,
    loadUser,
    logoutUser,
    updateUserInformation,
    updateUserAvatar,
    updateUserAddress,
    deleteUserAddress,
    changeUserPassword,
}
