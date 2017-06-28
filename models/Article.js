//require Mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create new article model with title and note "columns"
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;