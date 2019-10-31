const express = require('express');
const router = express.Router();
const TripItem = require('../models/tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// post route
// creating an item and adding it to list
router.post('/createItem/:id', async (req, res, next) => {
	try {
		// find the trip
		const foundTrip = await Trip.findById(req.params.id)
		// create the trip item
		console.log("this is req.body in /createItem/:id POST" + '------------------------')
		console.log(req.body)
		console.log("this is req.body in /createItem/:id POST" + '------------------------')
		const newTripItem = {
			description: req.body.description,
			chosenList: req.body.chosenList
		}
		const createdTripItem = await TripItem.create(newTripItem);

		// conditionals as to where to put it in
		if(req.body.chosenList == 'itemsToPlan') {
			foundTrip.itemsToPlan.push(createdTripItem)
			await foundTrip.save()

		} else if(req.body.chosenList == 'plannedItems') {
			foundTrip.plannedItems.push(createdTripItem)
			await foundTrip.save()

		} else if(req.body.chosenList == 'suggestedItems'){
			foundTrip.suggestedItems.push(createdTripItem)
			await foundTrip.save()

		} else {
			res.send('error')
		}

		// bring it back to the home page
		res.redirect('/trips/tripHomePage/' + foundTrip._id)
	}	
	catch(err) {
		next(err)
	}
})

// getting the edit page
// make a route for the user to edit an item on the list
router.get('/:id/tripItemEdit', async (req, res, next) => {
	try {
		const foundItem = await TripItem.findById(req.params.id); 
		foundItem.description = req.body.description
		console.log(foundItem, '<-- this is the found item');
		res.render('trips/tripItemEdit.ejs', {
			foundItem: foundItem
		})
	}
	catch(err) {
		next(err)
	}
})

// editing actual item
router.put('/:id', async (req, res, next) => {
	try {
		// find the trip
		const foundTrip = await Trip.findOne({'itemsToPlan': req.params.id});
		console.log('----- this is the found trip in the edit item route');
		console.log(foundTrip);
		console.log('--------------------');
		// first find the items
		const updatedItem = await TripItem.findById(req.params.id);
		console.log('this is the found item in the edit route');
		console.log(updatedItem);
		console.log('----------------');
		// update the description
		updatedItem.description = req.body.description
		// save it -- we are mutating a document
		await updatedItem.save();
		console.log('this is afte editing')
		console.log(foundTrip);
		console.log('-------------------');
		// redirect
		res.redirect('/trips/tripHomePage/' + foundTrip._id);
	}
	catch(err) {
		next(err)
	}
})

//delete route for trip item
// router.delete('/:id', async (req, res) => {
// 	// find the id of the trip and delete it
// 	const foundTrip = await Trip.findById(req.params.id);

//     TripItem.deleteOne({_id: req.params.id}, (err, result) => {
//         if(err){
//             res.send(err)
//         } else {
//         	// bring them back to the home page
//             res.redirect('/trips/tripHomePage/' + foundTrip._id);

//         }
//     })
// });
router.delete('/:id', async (req, res, next) => {
	try {
		const foundTrip = await Trip.findOne({'itemsToPlan': req.params.id});
		const deleteTripItem = await TripItem.findByIdAndRemove(req.params.id);
		res.redirect('/trips/tripHomePage/' + foundTrip._id)
	}
	catch(err) {
		next(err)
	}
})


























module.exports = router;