const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.js')
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

//create group route
router.get('/createGroup', (req, res) => {
	res.render('trips/createGroup.ejs')
})

//edit group route
router.get('/editGroup', (req, res) => {
	res.render('trips/editGroup.ejs')
})



module.exports = router;