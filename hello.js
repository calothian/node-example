// web.js
var logfmt = require("logfmt");
var express = require("express");
var mongo = require("mongodb");
var monk = require("monk");

// TBD fix this to use app.configure()
var dbUri = process.env.MONGOHQ_URL || 'mongodb://' + process.env.WERCKER_MONGODB_HOST + ':' + process.env.WERCKER_MONGODB_PORT || 'mongodb://localhost';

console.log("Mongo URI is " + dbUri);
//var db = monk(dbUri);

var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World! Welcome to my sandbox.\n');
});

app.get('/collections', function(req, res) {
  //db.driver.collectionNames(function(err, names) {
  //  res.json(names);
  //});
  res.send('Collections here\n');
});

app.get('/collections/:name', function(req, res) {
  //var collection = db.get(req.params.name);
  //collection.find({}, {limit:20}, function(err, docs) {
   // res.json(docs);
  //});
  res.send('Collection by name here\n');
});

// TBD get document by color, or _id
// TBD Create, Update, Delete operations on documents

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Now listening on " + port);
});

module.exports = app;

