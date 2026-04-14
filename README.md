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
