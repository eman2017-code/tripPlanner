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

// // post route
// router.post('/', (req, res) => {
// 	// console.log(req.body, '<--- this should be the contents of the form');

// 	// push the contents of req.body into the tripSchema's respective places
// 	// console.log(req.body.place, ' this is the place');
// 	// Trip.destination.push(req.body.place);
// 	console.log('----------- This is the schema paths');
// 	//populate path with the schema we are sending 

// 	console.log(Trip.paths.destination.instance)
// 	console.log('-----------');
// 	// console.log(Trip, '<-- this is the console.log(from trip);');

// 	// console.log(req.body.date, ' these are the dates');
// 	// console.log(req.body.member, ' this is the member');


// 	res.redirect('trips/createTripHomePage');
// });

// user will enter in their basic information for the trip
// user will put in the names of the people who are going to be going on the trip with them
// if checkbox is clicked, the person whose name is next to it is not a moderator
// the user who has created the trip is also a moderator



























module.exports = router;