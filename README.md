# CST218 Air Fryer Recipe Project

This is a project I created for my CST-218 college course. After creating an account users are able to create and/or change/delete recipes saved to their account. This is similar to a personal cookbook.

This project has:
- Register + login that returns a token (JWT)
- Auth middleware (Bearer token)
- A protected /profile route to show if logged in
- A user-owned CRUD router for /recipes and /receipes/:id

## Setup
1. Install dependencies:
   npm install
2. Paste your MongoDB connection string into `.env`
3. Start:
   node server.js

## Routes
- POST /register
- POST /login   -> returns token
- GET  /profile (protected)

- GET /recipes (protected)
- GET /recipes/:id (protected, requires recipe id)
- POST /recipes (protected)
- PUT /recipes/:id (protected, requires recipe id)
- DELETE /recipes/:id (protected, requires recipe id)

## Getting Started
1. Go to POST /register and use { "email" : "YOUR_EMAIL", "password" : "YOUR_PASSWORD" } as the JSON body to create an account.
2. Login at POST /login with the email and password { "email" : "YOUR_EMAIL", "password" : "YOUR_PASSWORD" } to receive a bearer token that should be good for 2 hours. 
3. For an Authorization header add Bearer YOUR_TOKEN as the value to use protected routes. 
4. GET /profile confirms if logged in or not. 
5. Create a recipe at POST /recipes to create a recipe with:
{
   "name": "RECIPE_NAME",
   "description": "RECIPE_DESCRIPTION",
   "ingredients": ["INGREDIENT", "INGREDIENT", ...],
   "instructions": "RECIPE_INSTRUCTIONS",
   "tags": ["OPTIONAL_TAG", "OPTIONAL_TAG", ...]
}
- Note: the "ingredients" and "tags" fields expect an array of strings. Also "tags" are completely optional and can be blank. The rest of the fields are required. 
6. View all user owned recipes at GET /recipes or a specific recipe at /recipes/:id, :id being replaced with the id of the specific recipe (automatically created after creating a recipe).
7. PUT /recipes/:id will change a field value listed in the JSON body, such as { "name" : "NEW_RECIPE_NAME "} OR { "instructions" : "NEW_RECIPE_INSTRUCTIONS" }. 
8. To delete a recipe simply do DELETE /recipes/:id and the specific recipe will be deleted. 

## New Features
- Added a new sort query parameter. For the GET /recipes route you can sort by "newest", "oldest", or "alpha" (alphabetically), such as doing /recipes?sort=oldest or /recipes?sort=alpha. If no sort parameter is added, the results will be sorted by newest by default. Putting in an incorrect sort parameter will give a 400 error message. 