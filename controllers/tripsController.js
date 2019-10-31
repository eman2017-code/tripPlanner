const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.js');
const TripItem = require('../models/tripItem.js')
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// rendering create trip page
router.get('/createTripPlan', (req, res) => {
	res.render('trips/createTripPlan.ejs')
});

// this method creates new items to the list
router.get('/addNewItem/:id', async (req, res, next) => {
	try {
		// find the actual trip
		const foundTrip = await Trip.findById(req.params.id);
		// the foundTrip now is saved within the current session of the user
		req.session.savedTrip = foundTrip;
		// render the home page for the actual trip for user
		res.render('trips/createTripHomePageDisplay.ejs', {
			// the saved trip is now the saved session of the user
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

router.get('/tripHomePage/:id', async(req, res, next) => {
	try {
		const foundTrip = await Trip.findById(req.params.id)
		.populate({
			path: 'itemsToPlan'
		})
		.populate({
			path: 'plannedItems'
		})
		.populate({
			path: 'suggestedItems'
		})
		.exec()
		console.log(foundTrip);
		res.render('trips/tripHomePage.ejs', {
			savedTrip: foundTrip,
			// tripItem: foundTrip.itemsToPlan
		})
	} catch(err){
		next(err)
	}
})	

// post route
// This creates a new Trip
router.post('/tripHomePage', async (req, res, next) => {
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
		createdTrip.returnDate  = req.body.returnDate;
		// get the description that the user entered
		createdTrip.description = req.body.description;
		// save the trip
		const savedTrip = await createdTrip.save();
		//this saves the trip to the session to be accessed later from a different route
		req.session.savedTrip = savedTrip;
		//console.log(savedTrip);
		//res.redirect('trips/createTripHomePage/' + savedTrip._id);
		res.redirect('/trips/tripHomePage/' + createdTrip._id)
	}
	catch(err) {
		next(err)
	}
});

router.get('/savedTrips', async(req, res, next) => {
	try {
		// find the all trips
		const foundTrips = await Trip.find({})
		res.render('trips/tripIndex.ejs', {
			foundTrips: foundTrips
		})
	} catch(err){
		next(err)
	}
})

//edit route
// this is editing the trip as a whole
router.get('/:id/tripEdit', async(req, res, next) => {
	try {
		// find the trip first
		const foundTrip = await Trip.findById(req.params.id)
		// render the edit page with the trip that correlates accordingly
		res.render('trips/tripEdit.ejs', {
			trip: foundTrip
		})
	} catch(err){
		next(err)
	}
})

// update route
// this is updating the trip
router.put('/:id', async(req, res, next) => {
	try {
		const updateTrip = await Trip.findById(req.params.id)
		updateTrip.destination = req.body.destination
		updateTrip.startdate = req.body.startDate;
		updateTrip.endDate = req.body.returnDate;
		updateTrip.description = req.body.description;
		await updateTrip.save();

		res.redirect('/trips/tripHomePage')
	} catch(err){
		next(err)
	}
})

// new route
// this created a new list item to be added to the page
router.get('/createList', (req, res) => {
	// the saved trip has the information of the saved session of the user
    res.render('trips/newList.ejs', {
    	savedTrip: req.session.savedTrip
    });
});

//delete route
router.delete('/:id', (req, res) => {
	// find the id of the trip and delete it
    Trip.deleteOne({_id: req.params.id}, (err, result) => {
        if(err){
            res.send(err)
        } else {
        	// bring them back to the home page
            res.redirect('/users/homePage');

        }
    })
});

// ADD MEMBERS	
// user will click add member
// member new page will display
// input form to add user will show
// user will input a username
// user will hit submit button
	// this will activate a post route
		// in the post route we will do....
		// User.find({// find the username})
		// if username !== null --> this means that it DOES exist

// // new route
// // this created a new member to be added to the home page
// router.get('/addMembers', (req, res) => {
// 	// the saved trip has the information of the saved session of the user
//     res.render('trips/addMembers.ejs', {
//     	savedTrip: req.session.savedTrip
//     });
// });


// // creating a member and adding it to the page
// router.post('/addMembers/', async (req, res, next) => {
// 	try {
// 		// find the trip
// 		const foundTrip = await Trip.findById(req.params.id)
// 		// populate this path
// 		.populate({
// 			path: 'members'
// 		})
// 		// execute it
// 		.exec()
// 		// find the user by the username from the form
// 		const newMember = await User.find({username: req.body.username})
// 		// add the new member to the members array
// 		foundTrip.members.push(newMember)
// 		// save the foundTrip, because you added a new member to its members array
// 		await foundTrip.save()

// 		res.redirect('/trips/tripHomePage/' + foundTrip._id)
// 	}	
// 	catch(err) {
// 		next(err)
// 	}
// })



		





























module.exports = router;