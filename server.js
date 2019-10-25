// dependencies
const express = require('express');
const app = express();
const PORT = 3000;
require('./db/db');

















app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});