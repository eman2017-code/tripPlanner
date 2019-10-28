const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.js')
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

//create group route
router.get('/createGroup', (req, res) => {
	res.render('trips/createGroup.ejs')
});

//edit group route
router.get('/editGroup', (req, res) => {
	res.render('trips/editGroup.ejs')
});

// rendering create trip page
router.get('/createTrip', (req, res) => {
	res.render('trips/createTripPlan.ejs')
});

// // post route
// router.post('/', (req, res) => {
// 	console.log(req.body, '<--- this should be the contents of the form');
// 	// res.redirect('trips/createGroup');
// });

// user will enter in their basic information for the trip
// user will put in the names of the people who are going to be going on the trip with them
// if checkbox is clicked, the person whose name is next to it is not a moderator
// the user who has created the trip is also a moderator



























module.exports = router;