const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');


// //edit group route
// router.get('/editGroup', (req, res) => {
// 	res.render('trips/editGroup.ejs')
// });

// rendering create trip page
router.get('/createTripPlan', (req, res) => {
	res.render('trips/createTripPlan.ejs')
});

// createTrip main page
router.get('/createTripHomePage', (req, res) => {
	res.render('trips/createTripHomePage.ejs')
})

//create group route
router.get('/createGroup', (req, res) => {
	res.render('trips/createGroup.ejs')
});

// post route

// first we need to find get the destination from within the Trip
	// we need to find the path that is within the schema
router.post('/', async (req, res, next) => {

	const createdTrip = Trip.create(req.body)
	createdTrip.destination = req.body.place
	console.log(createdTrip);
	// console.log('This is the destination path within the Trip schema');
	// console.log(Trip.path('desination'));
	// console.log('======== This is the the trip paths ');
	// console.log(req.body);

	// // create (.create()) some trip 

	// destination.push('Colorado')

	// sometrip.destination = "colorado" // req.boy

	// // .save()

	// console.log(Trip.schema.paths.destination);


})



























module.exports = router;