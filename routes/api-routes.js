var request=require("request");
var cheerio=require("cheerio");

var Article=require("./../models/Article");

module.exports= function(app) {
  //GET request to scrape The Onion
  app.get("/scrape", function(req, res) {
    request("http://catscradle.com/events/", function(error, response, html) {
      var array = [];
      var $ = cheerio.load(html);
      var count = 0;
  //grab every h2 with the class headline

  	 while (array.length < 8) {
  		$("h2.rhino-event-header").each(function(i, element) {
  			if (count < 8) {
  				var result = {};

		       
		        	result.title = $(this).children("a").attr("title");
			        result.link = $(this).children("a").attr("href");

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

	        		count++;
  			}     
      });
    }
      
//end for loop

      var headlines = { articles: array }
      res.render("index.handlebars", headlines);
    });
  });

  //saving articles
  app.post("/saved/:id", function(req, res) {
    Article.findOneAndUpdate({"_id": req.params.id}, {"savedArticle": true})
      .exec(function(error, doc) {
        if (error) {
          console.log(error);
        }
        else {
          res.send(doc);
        }
      });
  });

};