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
		.populate(
			'members'
		)
		.exec()
		res.render('trips/tripHomePage.ejs', {
			savedTrip: foundTrip,
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
		updateTrip.returnDate = req.body.returnDate;
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


// ADDING MEMBERS
// new route
// this created a new member to be added to the home page
router.get('/addMembers', (req, res) => {
	// the saved trip has the information of the saved session of the user
    res.render('trips/addMembers.ejs', {
    	savedTrip: req.session.savedTrip
    });
});

// creating a member and adding it to the page
router.post('/addMembers/:id', async (req, res, next) => {
	try {
		// find the trip
		const foundTrip = await Trip.findById(req.params.id)
	
		// find the user by the username from the form
		const newMember = await User.findOne({username: req.body.username})
		// console.log(newMember, '<-- this is the newMember that has been added');

		// add the new member to the members array
		foundTrip.members.push(newMember)

		// save the foundTrip, because you added a new member to its members array
		await foundTrip.save()

		res.redirect('/trips/tripHomePage/' + foundTrip._id)
	}	
	catch(err) {
		next(err)
	}
});

// show route for each member

// first we need to find a member by their id
router.get('/:id/showMember', async (req, res, next) => {
	try {
		const foundMember = await User.findById(req.params.id)
		console.log(foundMember, '<--- this is the foundMember object');
		// console.log(newMember._id, '<--- this is the newMember id');
		res.render('trips/memberDelete.ejs', {
			foundMember: foundMember
		})
	}
	catch(err) {
		next(err)
	}
});

// delete route for member
router.delete('/member/:memberId/:tripId', async (req, res, next) => {
	try {
		const foundTrip = await Trip.findOne({'members': req.params.id})

		// console.log(foundTrip.members, '<--- this is the members array before');

		// create a new array of id's that do not contain the deletedMember
		// loop through the members in the new array
		// save ndw array
		//display members from copied array now trip.membrs array

		// copy the array
		
		// console.log(deletedMember._id)

		// create an array for members that have been removed
		
		// const copyOfMembers = foundTrip.members.slice();

		// loop through the original list of members that have been added
		for(let i = 0; i < foundTrip.members.length; i++) {

			// const removedMembers = [];

			console.log('----------------------');
			console.log('this is the foundTrip._id.members');
			console.log(foundTrip.members[i]._id);
			console.log('----------------------');

			// if the removed member's id == their shallow copy
			if(foundTrip.members[i]._id === req.params.id) {
				// remove the id from the array and push it into the removedMembers=[]
				console.log('this one will be removed');
			} else {
				console.log('didnt work my guy');
			}

		}

		// await foundTrip.members.splice(deletedMember, 1);
		// await foundTrip.save()
		console.log(foundTrip.members, '<--- this is the members array after');
		//we are rpassing through 'deletedMember' which is just a an object but not does identify which
		// INDEX it is at within the members array
		// console.log('your member has been deleted!');


		res.redirect('/trips/tripHomePage/' + foundTrip._id);
	}
	catch(err) {
		next(err)
	}
})

// router.delete('/member/:id', async (req, res, next) => {
// 	try {
// 		const foundTrip = await Trip.find({
// 			'members': req.params.id
// 		})
// 		console.log(foundTrip);
// 		const foundMember = await User.findById(req.params.id)
// 		console.log(foundMember);
// 		for (let i = 0; i < foundTrip.members.length; i++) {
// 			console.log('-------These are the foundTrip.members--------');
// 			console.log(foundTrip.members[i])
// 			if(foundTrip.members[i]._id === foundMember._id){0
// 				console.log('they match!')
// 			}  else {
// 				console.log('didnt work');
// 			}
// 		}
// 	}
// 	catch(err) {
// 		next(err)
// 	}
// })



		





























module.exports = router;