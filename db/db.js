const mongoose = require('mongoose');

// this is the URL
const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, {
	useNewUrlParser: true,
  	useCreateIndex: true,
  	useFindAndModify: false,
  	useUnifiedTopology: true
})


mongoose.connection.on('connected', () => {
	console.log("connected to db: " + connectionString);
})

mongoose.connection.on('disconnected', () => {
	console.log("disconneted from db");
})

mongoose.connection.on('error', (error) => {
	console.log("error with db: ", error);
})