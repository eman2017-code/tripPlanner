## USER STORIES
	- User will see a register form and a sign in form when app first loads
	- If user does not have an account
		- they will not be able to sign into app. Error will pop up if they try and enter information and it is incorrect
		- the registration form will ask for; 
		1. First Name and Last Name  
		2. Username   
		3. Email address     
		4. Address
		5. Password
	- If user does have an account, 
		- They will be asked to sign in with their information
		1. Username
		2. Password
	- They will be brought into the landing page where all the main sections of the website are shown
	- User can create a trip
		* User can add other people to the group
		* User who created the group will be the moderator
		* User can select destination for group
		* User and all the other members of the group will be able to add to the list
			* Things to Do
			* Itenerary
			* Things to potentially get done (Wish List)
	- User can see their current trips and past trips they have gone on
	- User can see most asked questions and and see answer (FAQ Form)
	- Trip Advisor/Points of Interest API
		- User will be to see recommendations/helpful tips based on destination from actual people

## STRETCH-GOALS
	- Subsections can be added to further breakdown 'legs' of the trip (more lists to add)
		- Example - A trip to Japan can be broken down into legs containing subsections that contain info for a trip to Tokyo or Osaka
	- Location API 
		- Be able to see live footage of places user and group is thinking about visiting
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
	email: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true}
})

const groupSchema = new mongoose.Schema({
	creator: {type: String},
	moderators: {[object]} //These are designated by the creator that are allowed to update certain info others arent
	fellowTravellers: {[object]} //These are everyone else going on the trip that aren't mods. They can access all the same information but cannot make updates. They can only add 'suggestions' that can be be 'approved' by a mod to add to the trip
})

const tripSchema = new mongoose.Schema({
	destination: {type: String}, -- //Where you are going
	length: {String}, //Total length of trip
	cost: {type: Number}, //cost breakdown of trip - basically a calculator that automatically adds costs you can input into things on the list
})

const profileSchema = new mongoose.Schema({
	fullName: {type: String },
	username: {type: String},
	email: {type: String},
})
```




















