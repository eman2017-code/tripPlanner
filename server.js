// dependencies
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const session = require('express-session')
require('./db/db');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: false
}))



app.use(session({
	secret: 'blah blah secret',
	saveUninitialized: false, // GDPR
	resave: false
}))


const userController = require('./controllers/usersController.js');
app.use('/users', userController);


app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});