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

// post route
router.post('/', (req, res) => {
	// when user hits create trip
	// the the data that user entered into form will be stored in database
	console.log(req.body);
	res.redirect('/trips/createGroup');
});









module.exports = router;