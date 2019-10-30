const express = require('express');
const router = express.Router();
const Tripitem = require('../models/tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');



router.post('/createItem/:id', async(req, res, next) => {
	try {//fnding the trip the list item will apart of
		//creating trip itm
		const tripItem = await TripItem.create(req.body);
		console.log(tripItem);
		tripItem.name = req.body.name;
		//saving trip item
		const savedItem = await tripItem.save();
		console.log(savedItem);
		res.redirect('/trips/createTripHomePage' + savedTrip._id)
	} catch(err){
		next(err)
	}
})
//find the trip idlist item is apart of
//create list item
//add list item to trip 
//display item on trp show page

























module.exports = router;