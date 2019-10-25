const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// index route
router.get('/', (req, res) => {
	res.render('index.ejs')
});

//rendering new registration page
router.get('/new', (req, res) => {
	res.render('users/register.ejs')
})

router.get('/login', (req, res) => {
	res.render('users/login.ejs')
})
//login route
router.post('/login', async(req, res, next) => {
	try {//this is findini a user object that matches thhe input username on th login form
		const foundUsers = await User.find({
			username: req.body.username
		})//if no user is found with that username direct to login page
		if(foundUsers.length === 0){
			console.log('username does not exist')
			res.redirect('/users/login')
		} else {
			const pw = req.body.password
			console.log(foundUsers[0]);
			if(bcrypt.compareSync(pw, foundUsers[0].password)){
				req.session.loggedIn = true;
				req.session.username = foundUsers[0].username
				res.render('users/homePage.ejs')
			} else {
				console.log('invalid password');
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
	console.log('this is username input from form');
	console.log(username)
	try {
		const user = await User.findOne({
			username: username
		})
		console.log('this is what is found when the user inputs a username')
		console.log(user);
		//if username does not exist do the following
		if(user !== null){
			console.log('username is taken');
			res.redirect('/users')
		} else{
			// users input 
			const pw = req.body.password
			const hashedPw = bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
			console.log(hashedPw);
			const createdUser = await User.create({
				username: username,
				password: hashedPw
			})
			console.log('this is our created user in the registration POST route')
			console.log(createdUser)
			req.session.loggedIn = true;
			req.session.username = createdUser.username;
			res.redirect('/users')
		}
	} catch(err){
		next(err)
	}
});

router.get('/logout', async(req, res, next) => {
	try {
		await req.session.destroy();
		res.redirect('/users')
		console.log('ths is the logout working');
	} catch(err){
		next(err)
	}
})



module.exports = router;