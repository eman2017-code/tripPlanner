const mongoose = require('mongoose');

//this schema can be used to create multiple dfferent items to be added to the trip. They will categorized based on where they are placed in the tripSchema.
const tripItemSchema = new mongoose.Schema({
	description: String,
	chosenList: String
})

const TripItem = mongoose.model('TripItem', tripItemSchema)
module.exports = TripItem;

