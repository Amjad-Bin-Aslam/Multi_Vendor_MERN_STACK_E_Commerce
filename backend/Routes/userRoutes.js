const express = require('express')
const { upload } = require('../middlewares/multer');
const { createUser, activateUser, loginUser, loadUser, logoutUser, updateUserInformation, updateUserAvatar } = require('../controllers/userController');
const {isAuthenticated} = require('../middlewares/auth');


const userRouter = express.Router()



// user APIs
userRouter.post('/create-user', upload.single('file'), createUser)
userRouter.post('/activation', activateUser)
userRouter.post('/login-user', loginUser)

userRouter.post('/logout-user', isAuthenticated, logoutUser)
userRouter.get('/load-user', isAuthenticated, loadUser)
userRouter.put('/update-user-info', isAuthenticated, updateUserInformation)
userRouter.put('/update-user-avatar', upload.single('file'), isAuthenticated, updateUserAvatar)


module.exports = userRouter; 