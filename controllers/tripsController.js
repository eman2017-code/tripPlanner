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

// // createTrip main page
// router.get('/createTripHomePage/:id', async (req, res, next) => {
// 	const foundTrip = await Trip.findById(req.params.id, (err, foundTrip) => {
// 		if(err){
// 			res.send(err)
// 		} else {
// 			res.render('/trips/createTripHomePage.ejs')
// 			createdTrip.destination
// 		}
// 	})
// 	// get trip from db
// })

router.get('/createTripHomePage/:id', async (req, res, next) => {
	try {
		const foundTrip = await Trip.findById(req.params.id);
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

// first we need to find get the destination from within the Trip
	// we need to find the path that is within the schema
router.post('/', async (req, res, next) => {
	try {
		// first we need to create a trip
		const createdTrip =  await Trip.create(req.body);

		// get the destination
		createdTrip.destination = req.body.place
		console.log(createdTrip.destination, '<--- this is the destination of the trip');
		//created

		// get the members name
		createdTrip.member = req.body.member;
		console.log(createdTrip.member, '<--- this is the member name');

		// get the start date that the user entered
		createdTrip.startDate = req.body.startDate;
		console.log(createdTrip.startDate, '<--- this is the created start Date');

		// get the end date that the user entered
		createdTrip.endDate = req.body.returnDate;
		console.log(createdTrip.endDate, '<--- this is the created End date');

		// obtain the description that the user entered
		createdTrip.description = req.body.description;
		console.log(createdTrip.description, '<--- this is the created description');

		const savedTrip = await createdTrip.save();
		//savedTrip._id  = "ab13e3bef33"
		res.redirect('trips/createTripHomePage/' + savedTrip._id);
	}
	catch(err) {
		next(err)
	}

})



























module.exports = router;