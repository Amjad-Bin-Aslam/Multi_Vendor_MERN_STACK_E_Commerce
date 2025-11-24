const eventModel = require("../models/eventModel")
const { find } = require("../models/productModel")
const shopModel = require("../models/shopModel")
const fs = require('fs')


// Create events
const createEvent = async (req , res) => {

    try {

        const shopId = req.body.shopId
        const shop = await shopModel.findById(shopId)
        if(!shop){
            return res.json({ success: false, message: "Shop ID is in invalid!" })
        } else {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.fileName}` || file.originalName )
            const eventData = req.body
            eventData.images = imageUrls
            eventData.shop = shop;

            const event =  await eventModel.create(eventData)

            return res.json({
                success: true,
                message: "Event created Successfully!",
                event
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}


// get All events
const getAllEventsShop = async (req,res) => {

    try {
         
        const shopId = req.params.id
        const events = await eventModel.find({shopId})

        return res.json({ success: true, events })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}



// delete event
// delete-shop-event/:id
const deleteShopEvent = async (req , res) => {

    try {

        const eventId = req.params.id

        const eventData  = await eventModel.findById(eventId)

        eventData.images.forEach((imageUrl) => {
            const filename = imageUrl
            const filePath = `uploads/${filename}`

            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(err)
                }
            })
        })

        const event = await eventModel.findByIdAndDelete(eventId)

        if(!event){
            return res.json({ success: false , message: "Event not found with this ID!" })
        }

        return res.json({ 
            success: true,
            message: "Event deleted successfully!"
        })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}


// get All the events
const getAllEvents = async (req, res) => {
    try {

        const allEvents = await eventModel.find()

        return res.json({ success: true, allEvents })
        
    } catch (error) {
        console.log("getAllEvents error:", error)
        return res.json({ success: false, message: error.message })
    }
}

 

module.exports = {
    createEvent,
    getAllEventsShop,
    deleteShopEvent,
    getAllEvents,
}