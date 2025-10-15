require('dotenv').config()
const express = require('express');
const connectDatabase = require('./db/Database');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const userRouter = require('./Routes/userRoutes');
const cors = require('cors')


const app = express()
const port = 4000 || process.env.PORT;

// app config
connectDatabase(); 


// middlewares
app.use(express.json()) 
app.use(cors())
app.use(cookieParser())
app.use('/', express.static("uploads"))
app.use(bodyParser.urlencoded({extended: true}))


// API end points
app.use('/api/user', userRouter)


app.get('/', (req,res) => {
    res.send("API is woriking fine.")
})



app.listen(port , () => { 
    console.log("Server started at PORT:",port)
})

