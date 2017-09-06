var request=require("request");
var cheerio=require("cheerio");

var Article=require("./../models/Article");

module.exports = function(app) {
  //Once articles are added to db, we will retrieve them
  app.get("/", function(req, res) {
    res.render("index.handlebars");
  });

  app.get("/saved", function(req, res) {
    Article.find({}, function(error, doc) {
      if (error) {
        res.send(error);
      }
      else {
       res.render("saved.handlebars", { "articles": doc });
      }
    });
  });
};
