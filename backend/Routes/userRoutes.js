const express = require('express')
const { upload } = require('../middlewares/multer')
const { createUser } = require('../controllers/user')

const userRouter = express.Router()



// user APIs
userRouter.post('/create-user', upload.single('file'), createUser)



module.exports = userRouter;