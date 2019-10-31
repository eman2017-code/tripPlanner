require('dotenv').config()
// console.log(process.env);
// dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json());

app.use(methodOverride('_method'))

app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false, // GDPR
	resave: false
}))


const userController = require('./controllers/usersController.js');
app.use('/users', userController);

const tripController = require('./controllers/tripsController.js')
app.use('/trips', tripController)

const tripItemController = require('./controllers/tripItemController.js')
app.use('/tripItems', tripItemController)

app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});