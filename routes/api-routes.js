var request=require("request");
var cheerio=require("cheerio");

var Article=require("./../models/Article");
var Note=require("./../models/Note");

module.exports= function(app) {
  //GET request to scrape The Onion
  app.get("/scrape", function(req, res) {
    request("http://www.theonion.com/section/science-technology/", function(error, response, html) {
      var array = [];
      var $ = cheerio.load(html);
  //grab every h2 with the class headline
      $("h2.headline").each(function(i, element) {
        var result = {};

        result.title = $(this).children("a").text();
        result.link = "http://www.theonion.com" + $(this).children("a").attr("href");

        var entry = new Article(result);

        entry.newsId = entry._id;

        array.push(entry);
        entry.save(function(err, doc) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(doc);
          }
        });
      });
      var headlines = { articles: array }
      res.render("index.handlebars", headlines);
    });
  });

//saving articles
app.post("/articles/:id", function(req, res) {
  Article.findOneAndUpdate({"_id": req.params.id}, {"savedArticle": true})
    .exec(function(error, doc) {
      if (error) {
        console.log(error);
      }
      else {
        res.send(doc);
      }
    });
    // var savedArticle = req.body.savedArticle;

    // if (savedArticle === true) {
    //   Article.findOneAndUpdate({ "_id": req.params.id}, {"savedArticle": true})
    //     .exec(function(err, doc) {
    //       if (err) {
    //         console.log(err);
    //       } else { 
    //         res.send(doc);
    //       }
    //     });
    // }
    // else if (savedArticle === false) {
    //   Article.findOneAndUpdate({ "_id": req.params.id }, { "savedArticle": false })
    //     .exec(function(err, doc) {
    //       if (err) {
    //         console.log(err);
    //       } else { 
    //         res.send(doc);
    //       }
    //     })
    // }
});

//add new note
app.post("/articles/:id", function(req, res) {
  var newNote = new newNote(req.body);

        newNote.save(function(error, doc) {
          if (error) {
            console.log(error)
          }
          else {
            Article.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})
              .exec(function(err, doc) {
                if (err) {
                  console.log(err)
                }
                else {
                  res.send(doc);
                }
              });
          }
        });
});

//update note
  app.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
      .populate("note")
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else { 
          res.json(doc);
        }
      });
  });


//delete note
app.delete("/delete/:id", function(req, res) {
  Note.remove({ "_id": req.params.id}, function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("Deleted");
    }
  });
});

};

