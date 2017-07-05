var request=require("request");
var cheerio=require("cheerio");

var Article=require("./../models/Article");
var Note=require("./../models/Note");

module.exports = function(app) {
  //Once articles are added to db, we will retrieve them
  app.get("/", function(req, res) {
    res.render("index.handlebars");
  });

  app.get("/saved", function(req, res) {
    var headlines = {};
    Article.find({"savedArticle": true}, function(error, doc) {
      if (error) {
        res.send(error);
      }
      else {
        headlines = { "articles": doc }
      }
    })
    res.render("saved", headlines);
  });
};
