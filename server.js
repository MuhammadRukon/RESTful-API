const express = require("express");
const mongoose = require("mongoose");
const Article = require("./dataModel");
const app = express();
const port = 3000;
const uri =
  "mongodb+srv://muhammad:eRsJMkfaOZYFmioD@cluster0.wgk6h9w.mongodb.net/wikiDB?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(uri);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//fetch all data
app.get("/fetch", (req, res) => {
  Article.find({}).then((data) => {
    res.status(200).json(data);
  });
});

// get data by id
app.get("/fetch/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const article = await Article.findById(id);
    res.json(article);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update by id
app.put("/fetch/:id", async (req, res) => {
  try {
    const { id } = await req.params;
    const article = await Article.findByIdAndUpdate(id, req.body);
    if (!article) {
      return res
        .status(404)
        .json({ message: `cannot find any product with id ${id}` });
    } else {
      // to get the updated document in postman after updating
      const updateProduct = await Article.findById(id);
      res.status(200).json(updateProduct);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete by id

app.delete("/fetch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id, req.body);
    if (!article) {
      res.status(404).json(`couldnot find any document of id $${id}`);
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//insert data
app.get("/insert", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/insert", (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  newArticle.save();

  res.redirect("/fetch");
});

// post via postman
app.post("/articles", async (req, res) => {
  try {
    const article = await Article(req.body);
    res.status(200).json(article);
    article.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
