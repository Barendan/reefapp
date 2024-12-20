# Simple Business Management App
This application is designed to help business owners manage products and handle customer orders. Built using Node.js and React.js, the app includes PostgreSQL for data storage and Docker for environment setup.


## Features:
- User Authentication
- Customer Order Tracking
- Product management (CRUD operations)



## To Run the Project:
*Make sure you have Docker and Docker Compose installed.


### 1. Clone the Repo
git clone https://github.com/Barendan/reefapp.git
cd reefapp


### 2. Run the App
docker-compose up --build

*This will setup the client, server, and database. 
As well as create the necessary migrations and seed the database with dummy data.


### 3. Using the App
Navigate to the client url to use the app's UI.
Use the server url to test endpoints directly.

Client will run on: http://localhost:3000
Server will run on: http://localhost:5000


### 4. Running Tests
You can run tests for the server or client with these commands:

docker-compose exec server npm test
docker-compose exec client npm test





Thank you for taking the time to check out my latest app!

