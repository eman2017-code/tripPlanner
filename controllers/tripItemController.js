const express = require('express');
const router = express.Router();
const TripItem = require('../models/tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// post routej for showing the new item on the list page
router.post('/createItem/:id', (req, res) => {
	// first we need to find the trip by its id
	Trip.findById(req.body.tripId, (err, foundTrip) => {
		// then we need to actually create the trip
		TripItem.create(req.body, (err, createdTripItem) => {
			if(err) {
				res.send(err);
			} else {
				// push the created trip into the foundTrip (id)'s array
				foundTrip.itemsToPlan.push(createdTripItem);
				// then we need to save it
				foundTrip.save((err, data) => {
					// render the original page again
					res.render('trips/createTripHomePageDisplay.ejs', {
						savedTrip: data
					})
				})
			}
		})
	})
});
























module.exports = router;