// dependencies
const express = require('express');
const app = express();
const PORT = 3000;
require('./db/db');

const userController = require('./controllers/users');
app.use('/', userController);



















app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});