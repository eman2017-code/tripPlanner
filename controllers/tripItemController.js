const express = require('express');
const router = express.Router();
const Tripitem = require('../models./tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const TripItem = require('../models/tripItem.js');
const bcrypt = require('bcryptjs');


// post route
router.post('/', (req, res) => {
	console.log(req.body, ' this should be the contents of the body');

<<<<<<< HEAD

// post route (adding items) 
router.post('/trip/createTripHomePage/:id', (req, res) => {
	TripItem.create(req.body, (err, createdTripItem) => {
		if(err) {
			res.send(err);
		} else {
			console.log(createdTripItem);
		}
	})
=======
    TripItem.create(req.body, (err, createdTripItem) => {
      if (err) {
        res.send(err)
      } else {
        console.log(createdTripItem);
        // I'm getting /fruits from the url in the index route
        // res.redirect('/fruits');
      }
    })
>>>>>>> 468e0fe7d879c4bf8ce2377518746751ed432c46
})
























module.exports = router;