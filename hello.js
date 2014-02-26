// web.js
var logfmt = require("logfmt");
var express = require("express");
var mongo = require("mongodb");
var monk = require("monk");

var dbUri = process.env.MONGOHQ_URL || 'mongodb://localhost';
var db = monk(dbUri);

var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World! Welcome to my sandbox.\n');
});

app.get('/collections', function(req, res) {
  db.driver.collectionNames(function(err, names) {
    res.json(names);
  });
});

app.get('/collections/:name', function(req, res) {
  var collection = db.get(req.params.name);
  collection.find({}, {limit:20}, function(err, docs) {
    res.json(docs);
  });
});

// TBD get document by color, or _id
// TBD Create, Update, Delete operations on documents

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Now listening on " + port);
});

module.exports = app;

