const express = require('express');
const router = express.Router();
const TripItem = require('../models/tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');



// router.post('/createItem/:id', async(req, res, next) => {
// 	try {
// 		//fnding the trip the list item will apart of
// 		//creating trip itm
// 		const tripItem = await TripItem.create(req.body);
// 		console.log(tripItem, '<- this is the tripItem');
// 		tripItem.name = req.body.name;
// 		//saving trip item
// 		const savedItem = await tripItem.save();
// 		console.log(savedItem, '<- this is the savedItem');
// 		// res.redirect('/trips/createTripHomePage' + savedTrip._id)
// 	} catch(err){
// 		next(err)
// 	}
// })

router.post('/createItem/:id', (req, res) => {
	// console.log(req.body);
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

					//res.redirect('/trips/createTripHomePageDisplay.' + savedTrip._id);
				})
			}
		})
	})
})





//find the trip idlist item is apart of
//create list item
//add list item to trip 
//display item on trp show page

























module.exports = router;