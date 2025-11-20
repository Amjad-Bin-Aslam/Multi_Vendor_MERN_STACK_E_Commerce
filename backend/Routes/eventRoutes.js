const express = require('express');
const { upload } = require('../middlewares/multer');
const { createEvent, getAllEventsShop, deleteShopEvent } = require('../controllers/eventController');
const { isSellerAuthenticated } = require('../middlewares/auth');

const eventRouter = express.Router();

// Event APIs
eventRouter.post('/create-event', upload.array('images'), createEvent)
eventRouter.get('/get-all-events-shop/:id', getAllEventsShop)

eventRouter.delete('/delete-event-shop/:id', isSellerAuthenticated, deleteShopEvent )


module.exports = eventRouter;