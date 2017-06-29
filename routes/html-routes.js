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
        headlines = { articles: doc }
      }
    })
    res.render("saved.handlebars", headlines);
  });
  
  app.post("/articles/:id", function(req, res) {
    var savedArticle = req.body.savedArticle;

    if (savedArticle === true) {
      Article.findOneAndUpdate({ "_id": req.params.id}, {"savedArticle": true})
        .exec(function(err, doc) {
          if (err) {
            console.log(err);
          } else { 
            res.send(doc);
          }
        });
    }
    else if (savedArticle === false) {
      Article.findOneAndUpdate({ "_id": req.params.id }, { "savedArticle": false })
        .exec(function(err, doc) {
          if (err) {
            console.log(err);
          } else { 
            res.send(doc);
          }
        })
    }
    else {
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
    }
  });

  app.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
      .populate("note")
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else { 
          res.send(doc);
        }
      });
  });
};
