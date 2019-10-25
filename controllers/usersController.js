const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// index route
router.get('/', (req, res) => {
	res.render('index.ejs')
});

router.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

//registration route
router.post('/', async(req, res, next) => {
	const username = req.body.username;
	console.log(username)
	try {
		const user = await User.findOne({
			username: username
		})
		console.log('this is what is found when the user inputs a username')
		console.log(user);
		if(user !== null){
			console.log('username is taken');
			res.redirect('/users/new')
		} else{
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
			res.redirect('/')
		}
	} catch(err){
		next(err)
	}
})



module.exports = router;