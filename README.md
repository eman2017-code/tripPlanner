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
		 * This can be done by finding a user by their username(or unique object ID) and adding them to the array that contains just your group members
		* User who created the group will be a moderator
		 *Additional users can be made moderators if desired by original creator
		 	*Creator has full functionality 
		 		*Moderators can add/delete/edit lists but cannot delete group or trip only creator can
		 			* Fellow Travellers can only make suggestions to be potentially but can not directly update the lists themselves
		* User will select destination for group
		* User and all the other members of the group will be able to add to the list
			* Things to Do
				*Tasks and Attractions that need to be completed so they can be eventually added to the intinerary
			* Itenerary
				* A completed list of tasks and attractions that are added to the trip interaray. Basically a completed list
			* Ideas and suggestions from group member.
				* This is an area where the group can congregate to share potential ideas and suggestions to get other users inputs and possibly add it to their lists
	- User can see their current trips, past trips, and groups they are currenty apart of
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
	email: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true}
})


const tripSchema = new mongoose.Schema({
    
    creator: ObjectID (User)
    moderators: [ObjectID (User)]
    members: [ObjectID (User)]
    startDate: Date
    endDate: Date
    title: text
    dest: text
    desc: text
    plannedItems: [TripItem.Schema] 
    itemsToPlan: [TripItem.schema]
    wishlist: [TripItem.schema]

})


const tripItemSchema = new mongoose.Schema({
    name: String,
    location: String,
    cost: Number,
    notes: String,
    date/Time: Date,
    dueDate: Date

})
```




















