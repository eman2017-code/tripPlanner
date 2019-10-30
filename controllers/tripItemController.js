const express = require('express');
const router = express.Router();
const TripItem = require('../models/tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// // post routej for showing the new item on the list page
// router.post('/createItem/:id', (req, res) => {
// 	// first we need to find the trip by its id
// 	Trip.findById(req.body.tripId, (err, foundTrip) => {
// 		// then we need to actually create the trip
// 		TripItem.create(req.body, (err, createdTripItem) => {
// 			if(err) {
// 				res.send(err);
// 			} else {

// 				// if the value of the button === 'plannedItems'
// 				// foundTrip.itemsToPlan.push(createdTripItem)

// 				// else if the value of the button  === 'itemsToPlan'
// 				// foundTrip.plannedTimes.push(createdTripItem)

// 				// else === 'suggestedItems'
// 				// foundTrip.wishList.push(createdTripItem)

// 				console.log(createdTripItem);

// 				// // then we need to save it
// 				// foundTrip.save((err, data) => {
// 					// render the original page again
// 					// console.log('this is the data from the creaete item route');
// 					// console.log('data i just made -> ', data);
// 					// console.log('--------------------');

// 					// console.log(req.body.chosenList)

// 					if(req.body.chosenList == 'itemsToPlan') {
				
// 						foundTrip.itemsToPlan.push(createdTripItem)
// 						// console.log('this one goes in toDo - ', data.itemsToPlan);

// 					} else if(req.body.chosenList == 'plannedItems') {
// 						foundTrip.plannedItems.push(createdTripItem)
// 						console.log('this one is for plannedItems');
// 					} else if(req.body.chosenList == 'suggestedItems'){
// 						foundTrip.suggestedItems.push(createdTripItem)
// 						console.log('this one is for suggested items');
// 					} else {
// 						res.send('error')
// 					}

// 					foundTrip.save((err, data) => {
// 						console.log('saved')
// 					})
// 						res.render('trips/tripHomePage.ejs', {
// 							savedTrip: foundTrip
// 						})
// 				// })
// 			}
// 		})
// 	})
// });

router.post('/createItem/:id', async (req, res, next) => {
	try {
		const foundTrip = await Trip.findById(req.params.id);
		const createdTripItem = await TripItem.create(req.body);

		if(req.body.chosenList == 'itemsToPlan') {
			foundTrip.itemsToPlan.push(createdTripItem)
			await foundTrip.save()

		} else if(req.body.chosenList == 'plannedItems') {
			foundTrip.plannedItems.push(createdTripItem)
			console.log('this one is for plannedItems');
			await foundTrip.save()

		} else if(req.body.chosenList == 'suggestedItems'){
			foundTrip.suggestedItems.push(createdTripItem)
			console.log('this one is for suggested items');
			await foundTrip.save()

		} else {
			res.send('error')
		}

		res.redirect('/trips/tripHomePage/' + foundTrip._id)
	}	
	catch(err) {
		next(err)
	}
})

























module.exports = router;