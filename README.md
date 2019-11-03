## USER STORIES
- User will see initial page that will have two links
	1. Login
	2. Register
- If user does not have an account
	- They will not be able to sign in 
	- If they try to sign in, an error will pop up
	- The registration form will ask for;  
		1. Email address    
		2. Username     
		3. Password
- If user does have an account, they will be asked for
	1. Username
	2. Password
- Once signed in...
	* They will be brought into the landing page where all the main sections of the website are shown
- User can create a trip
	* User can add other people to the group
	* This will be done by finding user's by their username
	* User will select destination for group
	* User and all the other members of the group will be able to add to the list
		- There will be 3 lists
			* A ToDo list
			* An Itinerary list
			* A Suggestions list
- User can see their current trips, past trips, and groups they are currenty apart of

## Nice to haves 
- User can see most asked questions and and see answer (FAQ Form)
- Trip Advisor/Points of Interest API
	- User will be to see recommendations/helpful tips based on destination from actual people that are then added into a suggestions area for the group to see.

## STRETCH-GOALS
- Subsections can be added to further breakdown 'legs' of the trip (more lists to add)
	- Example - A trip to Japan can be broken down into legs containing subsections that contain info for a trip to Tokyo or Osaka
- A cost breakdown will be determined based on events added to a completed list

### WIREFRAMES:
1. https://wireframe.cc/nKojLg
	- Log In/Sign Up Form
2. https://wireframe.cc/GVVxU9
	- Landing page
3. https://wireframe.cc/6DyqUJ
	- Create Trip Page

### Model Schemas:
```javascript
const userSchema = new mongoose.Schema({
	email: {type: String},
	username: {type: String, required: true},
	password: {type: String, required: true},
})


const tripSchema = new mongoose.Schema({
	moderators: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	startDate: {type: String},
	returnDate: {type: String},
	title: {type: String},
	destination: {type: String},
	description: {type: String},
	plannedItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TripItem',
	}],
	itemsToPlan: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TripItem',
	}],
	suggestedItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TripItem'
	}]
})


const tripItemSchema = new mongoose.Schema({
	description: String,
	chosenList: String
})
```




















