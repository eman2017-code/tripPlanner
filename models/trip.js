const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
	//the follow are arrays of object Id's for each user froom th user schema
	creator: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
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
	//the follow ar arrays of object Id's from the tripitem schema
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