const express = require('express');
const router = express.Router();
const Tripitem = require('../models./tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');




// post route (adding items) 
router.post('/trip/createTripHomePage/:id', (req, res) => {
	TripItem.create(req.body, (err, createdTripItem) => {
		if(err) {
			res.send(err);
		} else {
			console.log(createdTripItem);
		}
	})
})


module.exports = router;