const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
	//the following are arrays of object Id's for each user froom the user schema
	moderators: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	startDate: {type: String},
	returnDate: {type: String},
	title: {type: String},
	destination: {type: String},
	description: {type: String},
	//the follow are arrays of object Id's from the tripitem schema
	plannedItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TripItem',
	}],
	itemsToPlan: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TripItem',
	}],
	suggestedItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TripItem'
	}]
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip;