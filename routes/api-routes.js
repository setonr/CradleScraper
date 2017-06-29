var request=require("request");
var cheerio=require("cheerio");

var Article=require("./../models/Article");
var Note=require("./../models/Note");

module.exports= function(app) {
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
          console.log(doc);
          }
        });
      });
      res.redirect("/");
    });
  });

};

