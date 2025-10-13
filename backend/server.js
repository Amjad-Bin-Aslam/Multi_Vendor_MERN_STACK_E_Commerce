require('dotenv').config()
const express = require('express')


// app config
const app = express()
const port = 4000 || process.env.PORT;



// middlewares
app.use(express.json())



app.get('/', (req,res) => {
    res.send("API is woriking fine.")
})


app.listen(port , () => {
    console.log("Server started at PORT:",port)
})

