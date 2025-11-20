require('dotenv').config()
const express = require('express');
const connectDatabase = require('./db/Database');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const userRouter = require('./Routes/userRoutes');
const shopRouter = require('./Routes/shopRoutes');
const cors = require('cors');
const productRouter = require('./Routes/productRoutes');
const eventRouter = require('./Routes/eventRoutes');


const app = express()
const port = 4000 || process.env.PORT;

// app config
connectDatabase(); 


// middlewares
app.use(express.json()) 
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use('/uploads', express.static("uploads"))
app.use(bodyParser.urlencoded({extended: true}))


// API end points
app.use('/api/user', userRouter)
app.use('/api/seller', shopRouter)
app.use('/api/product' , productRouter)
app.use('/api/event', eventRouter)


app.get('/', (req,res) => {
    res.send("API is woriking fine.")
})



app.listen(port , () => { 
    console.log("Server started at PORT:",port)
})

 