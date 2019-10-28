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
	try {
		// first we need to create a trip
		const createdTrip =  await Trip.create(req.body);

		// get the destination
		const destinationOfTrip = createdTrip.destination = req.body.place
		console.log(destinationOfTrip, '<--- this is the destination of the trip');

		// get the members name
		const memberName = createdTrip.member = req.body.member;
		console.log(memberName, '<--- this is the member name');

		// get the start date that the user entered
		const createdStartDate = createdTrip.startDate = req.body.startDate;
		console.log(createdStartDate, '<--- this is the created start Date');

		// get the end date that the user entered
		const createdEndDate = createdTrip.endDate = req.body.returnDate;
		console.log(createdEndDate, '<--- this is the created End date');

		// obtain the description that the user entered
		const createdDescription = createdTrip.description = req.body.description;
		console.log(createdDescription, '<--- this is the created description');

		await createdTrip.save();
		res.redirect('trips/createTripHomePage');
	}
	catch(err) {
		next(err)
	}

})



























module.exports = router;