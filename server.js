//basic requires
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
//scraper requires
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://heroku_wcsq2591:of7uheoiv7q5rkie7sc28qfvqj@ds139082.mlab.com:39082/heroku_wcsq2591");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: " + error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.")
});

//ROUTES!!!!!!!!!!!!!!!!!

//GET request to scrape The Onion
app.get("/scrape", function(req, res) {
  request("http://www.theonion.com/section/science-technology/", function(error, response, html) {
    var $ = cheerio.load(html);
//grab every h2 with the class headline
    $("h2.headline").each(function(i, element) {
      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      var entry = new Article(result);

      entry.save(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      });
    });
  });
});

//Once articles are added to db, we will retrieve them
app.get("/articles", function(req, res) {
  Article.find({}, function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(doc);
    }
  });
});

//To get an article by its ID
app.get("/articles/:id", function(req, res) {
  Article.findOne({"_id": req.params.id})
    .populate("note")
    .exec(function(error, doc) {
      if (error) {
        console.log(error);
      }
      else {
        res.join(doc);
      }
    });
});

//POST route to create a new note or replace existing
app.post("/articles/:id", function(req, res) {
  var newNote = new Note(req.body);

  newNote.save(function(error, doc) {
    if (error) {
        console.log(error);
      }
      else {
        Article.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})
          .exec(function(err, doc) {
            if (err) {
              console.log(err);
            }
            else {
              res.send(doc);
            }
          });
      }
  });
});

app.listen(3000, function() {
  console.log("News is being collected on port 3000!!");
});
