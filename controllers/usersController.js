const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Trip = require('../models/trip.js')
const TripItem = require('../models/tripItem.js')
const bcrypt = require('bcryptjs');

// index route
router.get('/', (req, res) => {
	res.render('index.ejs')
});

//rendering new registration page
router.get('/new', (req, res) => {
	res.render('users/register.ejs')
});

// rendering login page
router.get('/login', (req, res) => {
	res.render('users/login.ejs')
});

// rendering home page
router.get('/homePage', (req, res) => {
	res.render('users/homePage.ejs')
})

//login route
router.post('/login', async(req, res, next) => {
	try {//this is findini a user object that matches the input username on th login form
		const foundUsers = await User.find({
			username: req.body.username
		})//if no user is found with that username direct to login page
		if(foundUsers.length === 0){
			// console.log('username does not exist')
			res.redirect('/users/login')
		} else {
			const pw = req.body.password
			// if the password that they entered is the correct
			if(bcrypt.compareSync(pw, foundUsers[0].password)){
				// they are not logged in
				req.session.loggedIn = true;
				req.session.username = foundUsers[0].username
				// take them to the home page
				res.redirect('/users/homePage')
			} else {
				res.redirect('/users/login')
			}
		}
	} catch(err){
		next(err)
	}
})

//registration route
router.post('/', async(req, res, next) => {
	//finding if username already exists
	const username = req.body.username;
	try {
		const user = await User.findOne({
			username: username
		})
		//if username does not exist do the following
		if(user !== null){
			// console.log('username is taken');
			res.redirect('/users')
		} else{
			// users input 
			const pw = req.body.password
			const hashedPw = bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
			const createdUser = await User.create({
				username: username,
				password: hashedPw
			})
			// they are now logged in
			req.session.loggedIn = true;
			req.session.username = createdUser.username;
			res.redirect('/users/homePage');
		}
	} catch(err){
		next(err)
	}
});

// logout route
router.get('/logout', async(req, res, next) => {
	try {
		await req.session.destroy();
		res.redirect('/users')
	} catch(err){
		next(err)
	}
})


module.exports = router;