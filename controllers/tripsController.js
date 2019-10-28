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

// we have to get the id of the specific id of the trip that the user is creating
router.get('/createTripHomePage/:id', async (req, res, next) => {
	try {
		// find the actual trip
		const foundTrip = await Trip.findById(req.params.id);
		// render the page with the found Trip
		res.render('trips/createTripHomePage.ejs', {
			savedTrip: foundTrip
		})
	}
	catch(err) {
		next(err)
	}
})

//create group route
router.get('/createGroup', (req, res) => {
	res.render('trips/createGroup.ejs')
});

// post route
router.post('/', async (req, res, next) => {
	try {
		// first we need to create a trip
		const createdTrip =  await Trip.create(req.body);
		// get the destination
		createdTrip.destination = req.body.place
		// get the members name
		createdTrip.member = req.body.member;
		// get the start date 
		createdTrip.startDate = req.body.startDate;
		// get the end date that the user entered
		createdTrip.endDate = req.body.returnDate;
		// get the description that the user entered
		createdTrip.description = req.body.description;
		// save the trip
		const savedTrip = await createdTrip.save();
		res.redirect('trips/createTripHomePage/' + savedTrip._id);
	}
	catch(err) {
		next(err)
	}

})



























module.exports = router;