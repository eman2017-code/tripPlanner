const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const TripItem = require('../models/tripItem.js');
const bcrypt = require('bcryptjs');


// post route
router.post('/', (req, res) => {
	console.log(req.body, ' this should be the contents of the body');

    TripItem.create(req.body, (err, createdTripItem) => {
      if (err) {
        res.send(err)
      } else {
        console.log(createdTripItem);
        // I'm getting /fruits from the url in the index route
        // res.redirect('/fruits');
      }
    })
})
























module.exports = router;