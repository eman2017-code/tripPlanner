const express = require('express');
const router = express.Router();
const TripItem = require('../models/tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// post route
// creating an item and adding it to list
router.post('/createItem/:id', async (req, res, next) => {
	try {
		// find the trip
		const foundTrip = await Trip.findById(req.params.id)
		// create the trip item
		const createdTripItem = await TripItem.create(req.body);

		// conditionals as to where to put it in
		if(req.body.chosenList == 'itemsToPlan') {
			foundTrip.itemsToPlan.push(createdTripItem)
			await foundTrip.save()

		} else if(req.body.chosenList == 'plannedItems') {
			foundTrip.plannedItems.push(createdTripItem)
			await foundTrip.save()

		} else if(req.body.chosenList == 'suggestedItems'){
			foundTrip.suggestedItems.push(createdTripItem)
			await foundTrip.save()

		} else {
			res.send('error')
		}

		// bring it back to the home page
		res.redirect('/trips/tripHomePage/' + foundTrip._id)
	}	
	catch(err) {
		next(err)
	}
})

// edit route
// make a route for the user to edit an item on the list
router.get('/:id/tripItemEdit', async (req, res, next) => {
	try {
		const foundItem = await TripItem.findById(req.params.id); 
		res.render('trips/tripItemEdit.ejs', {
			foundItem: foundItem
		})
	}
	catch(err) {
		next(err)
	}
})

























module.exports = router;