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

// createTripHomePage route
router.get('/createTripHomePage', (req, res) => {
	res.render('trips/createTripHomePage.ejs')
})

// post route

// user will enter in their basic information for the trip
// user will put in the names of the people who are going to be going on the trip with them
// if checkbox is clicked, the person whose name is next to it is not a moderator
// the user who has created the trip is also a moderator

router.post('/', (req, res) => {
	console.log(req.body);
	res.redirect('trips/createTripHomePage');
})










module.exports = router;