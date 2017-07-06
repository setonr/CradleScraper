"use strict";
//basic requires
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressHbs = require("express-handlebars");
var path = require("path");
//scraper requires
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname + "/public")));

var mongodbURI = "mongodb://heroku_wcsq2591:of7uheoiv7q5rkie7sc28qfvqj@ds139082.mlab.com:39082/heroku_wcsq2591";

mongoose.connect(mongodbURI);
// mongoose.connect("mongodb://localhost/articles_db");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: " + error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.")
});

app.engine("handlebars", expressHbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, function() {
  console.log("Cat's Cradle gigs now being collected on port " + PORT + "!!");
});
