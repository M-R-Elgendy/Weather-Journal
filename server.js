// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const cors = require('cors');
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Server Routes

//GET

//function to sendData
const sendData = (req, res) => {
    res.send(projectData);
};

// GET route
app.get('/all', sendData);


//POST

//Function To Insert Data
const insertData = (req, res) => {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    projectData['name'] = req.body.name;
    res.send(projectData);
}

//Post Route
app.post('/add', insertData);



// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on localhost: ${port}`);
});