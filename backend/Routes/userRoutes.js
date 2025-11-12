const express = require('express')
const { upload } = require('../middlewares/multer');
const { createUser, activateUser, loginUser, loadUser, logoutUser } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/authUser');


const userRouter = express.Router()



// user APIs
userRouter.post('/create-user', upload.single('file'), createUser)
userRouter.post('/activation', activateUser)
userRouter.post('/login-user', loginUser)

userRouter.post('/logout-user', isAuthenticated, logoutUser)
userRouter.get('/load-user', isAuthenticated, loadUser)


module.exports = userRouter;