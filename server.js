const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoDB = require('mongodb');

var objectID = mongoDB.ObjectID;
var CONTACTS_COLLECTION = 'contacts';

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var db;

mongoDB.mongoClient.connect(process.env.MONGODB_URI, function(error, database) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  db = database;
  console.log('Database Connection Ready!');

  // Initialize the Application
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("Application Server now running on Port", port);
  });
});

// Contacts API - Routes

// Generic Error Handler used by all Endpoints
function handleError(response, reason, message, code) {
  console.log("ERROR: " + reason);
  response.status(code || 500).json({
    'error': message
  });
}

/**
 * '/contacts'
 * GET: finds all contacts
 * POST: creates new contact
 */

app.get('/contacts', function(req, res) {

});

app.post('/contacts', function(req, res) {
  var newContact = req.body;
  newContact.creationDate = new Date();

  if ( !(req.body.firstName || req.body.lastName) ) {
    handleError(res, 'Invalid User Input', 'Must provide a first name or last name.', 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, 'Failed to create a new contact.');
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/**
 * '/contacts/:id'
 * GET: find contact by ID
 * PUT: update contact by ID
 * DELETE: delete contact by ID
 */

app.get('/contacts/:id', function(request, response) {

});

app.put('/contacts/:id', function(request, response) {

});

app.delete('/contacts/:id', function(request, response) {

});
