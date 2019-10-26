const express = require('express');
const router = express.Router();
const Trip = require('../models/trip.js')
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

router.get('/createGroup', (req, res) => {
	res.render('trips/createGroup.ejs')
})


module.exports = router;