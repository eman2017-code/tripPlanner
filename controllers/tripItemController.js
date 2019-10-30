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
				console.log('-----------------------------------');
				console.log('this is the created Trip item description');
				const itemDescription = createdTripItem.description
				console.log(itemDescription)
				
				// createdTripItem.description = req.body.description
				console.log('-----------------------------------');

				// push the created trip into the foundTrip (id)'s array
				console.log('----------------------------------');
				console.log('this is the items to plan in foundTrip');
				foundTrip.itemsToPlan.push(itemDescription);
				console.log(foundTrip.itemsToPlan);
				// console.log(foundTrip.itemsToPlan);
				console.log('-----------------------------------');
				// then we need to save it
				foundTrip.save((err, data) => {
					// render the original page again
					// console.log('this is the data');
					// console.log(data);
					// console.log('this is the itemsToPlan');
					// console.log(data.itemsToPlan);
					//data.itemsToPlan just returns the created item ID in an array but not the 
					// created item Object

					// console.log('--------------------');
					res.render('trips/tripHomePage.ejs', {
						savedTrip: data
					})
				})
			}
		})
	})
});

























module.exports = router;