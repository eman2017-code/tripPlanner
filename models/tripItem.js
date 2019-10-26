const mongoose = require('mongoose');

//this schema can be used to create multiple dfferent items to be added to the trip. They will categorized based on where they are placed in the tripSchema.
const tripItemSchema = new mongoose.Schema({
	name: String,
	location: String,
	cost: Number,
	notes: String,
	date: Date,
	dueDate: Date,
})

const Tripitem = mongoose.model('Tripitem', tripItemSchema)
module.exports = Tripitem;