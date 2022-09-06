var express = require("express");
var app = express();

let comments = [];

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  // res.render("index", { num: 30 });
  res.render("index", { comments: comments });
});

app.get("/create", (req, res) => {
  console.log(req.query);
  res.send("get hi");
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const { content } = req.body;
  comments.push(content);
  console.log(comments);
  res.redirect("/");
});

app.listen(8080);
console.log("Server is listening on port 8080");
