module.exports = function(app) {
  //Once articles are added to db, we will retrieve them
  app.get("/", function(req, res) {
    res.render("index.handlebars");
  });

  app.get("/saved", function(req, res) {
    res.render("saved.handlebars");
  });
  

};


//POST route to create a new note or replace existing
// app.post("/articles/:id", function(req, res) {
//   var newNote = new Note(req.body);

//   newNote.save(function(error, doc) {
//     if (error) {
//         console.log(error);
//       }
//       else {
//         Article.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})
//           .exec(function(err, doc) {
//             if (err) {
//               console.log(err);
//             }
//             else {
//               res.send(doc);
//             }
//           });
//       }
//   });
// });