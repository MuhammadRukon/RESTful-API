const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
