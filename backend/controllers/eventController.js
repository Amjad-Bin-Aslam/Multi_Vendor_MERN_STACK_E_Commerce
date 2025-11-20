const eventModel = require("../models/eventModel")
const shopModel = require("../models/shopModel")


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

        const event  = await eventModel.findByIdAndDelete(eventId)

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



module.exports = {
    createEvent,
    getAllEventsShop,
    deleteShopEvent
}