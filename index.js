var express = require("express");
var app = express();

// let comments = [];

const { Sequelize, DataTypes } = require("sequelize");

// Option 2: Passing parameters separately (sqlite) / save it as a file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

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
