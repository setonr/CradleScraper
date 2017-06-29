//require Mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create new article model with title and note "columns"
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  savedArticle: {
    type: Boolean,
    default: false
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;