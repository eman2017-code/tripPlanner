const express = require('express');
const router = express.Router();
const Tripitem = require('../models/tripItem.js')
const Trip = require('../models/trip.js');
const User = require('../models/user.js');
const TripItem = require('../models/tripItem.js');
const bcrypt = require('bcryptjs');

//create list item
router.get('/createItem', (req, res) => {
	res.render('trips/newList.ejs')
})
//find the trip list item is apart of
//create list item
//add list item to trip 
//display item on trp show page

























module.exports = router;