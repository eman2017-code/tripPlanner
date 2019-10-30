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
		// console.log("\n here is foundTrip in GET /createTripHomePage/:id ", foundTrip);
		req.session.savedTrip = foundTrip;
		console.log('this is req.session.savedTrip at creeateTripHomePage');
		console.log(req.session.savedTrip);
		res.render('trips/createTripHomePage.ejs', {
			savedTrip: req.session.savedTrip
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
		// create a trip
		const createdTrip =  await Trip.create(req.body);
		// get the destination
		createdTrip.destination = req.body.destination;
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
		//this saves the trip to the session to be accessed later from a different route
		req.session.savedTrip = savedTrip;
		res.redirect('trips/createTripHomePage/' + savedTrip._id);
	}
	catch(err) {
		next(err)
	}
});

router.get('/savedTrips', async(req, res, next) => {
	try {
		const foundTrips = await Trip.find({})
		res.render('trips/tripIndex.ejs', {
			foundTrips: foundTrips
		})
	} catch(err){
		next(err)
	}
})

//edit route
router.get('/:id/tripEdit', async(req, res, next) => {
	try {
		const foundTrip = await Trip.findById(req.params.id)
		res.render('trips/tripEdit.ejs', {
			trip: foundTrip
		})
	} catch(err){
		next(err)
	}
})

// update route
router.put('/:id', async(req, res, next) => {
	try {
		const updateTrip = await Trip.findById(req.params.id)
		updateTrip.destination = req.body.destination
		updateTrip.startdate = req.body.startDate;
		updateTrip.endDate = req.body.returnDate;
		updateTrip.description = req.body.description;
		await updateTrip.save();
		res.redirect('/trips/createTripHomePage/' + updateTrip._id)
	} catch(err){
		next(err)
	}
})

// new route
router.get('/createList', (req, res) => {
    res.render('trips/newList.ejs', {
    	savedTrip: req.session.savedTrip
    });
});

//delete route
router.delete('/:id', (req, res) => {
    Trip.deleteOne({_id: req.params.id}, (err, result) => {
        if(err){
            // res.send(err)
            console.log('well that didnt work');
        } else {
            // console.log('this will work');


            res.redirect('/users/homePage');

        }
    })
});

module.exports = router;