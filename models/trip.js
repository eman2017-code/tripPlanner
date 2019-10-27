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
	startDate: Date,
	endDate: Date,
	title: String,
	destination: String,
	description: String,
	//the follow are arrays of object Id's from the tripitem schema
	plannedItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tripitem',
	}],
	itemsToPlan: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tripitem',
	}],
	suggestedItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tripitem'
	}]
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip;