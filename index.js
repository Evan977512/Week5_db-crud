var express = require("express");
var app = express();

// let comments = [];

const { Sequelize, DataTypes } = require("sequelize");

// Option 2: Passing parameters separately (sqlite) / save it as a file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Comments = sequelize.define(
  "Comments",
  {
    // Model attributes are defined here
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

(async () => {
  // create a table
  await Comments.sync();
  console.log("The table for the Comments model was just created");
})();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", async (req, res) => {
  // res.render("index", { num: 30 });

  // Find all users
  const comments = await Comments.findAll();
  // console.log(comments);

  res.render("index", { comments: comments });
});

app.get("/create", (req, res) => {
  console.log(req.query);
  res.send("get hi");
});

// create list
app.post("/create", async (req, res) => {
  console.log(req.body);
  const { content } = req.body;

  // Create a data
  const jane = await Comments.create({ content: content });
  console.log("Evan's auto-generated ID:", jane.id);

  res.redirect("/");
});

// update list
app.post("/update/:id", async (req, res) => {
  // console.log(req);
  console.log(req.params);
  console.log(req.body);

  const { content } = req.body;
  const { id } = req.params;

  // update data
  await Comments.update(
    { content: content },
    {
      where: {
        id: id,
      },
    }
  );

  res.redirect("/");
});

// delete data
app.post("/delete/:id", async (req, res) => {
  // console.log(req);
  console.log(req.params);
  const { id } = req.params;

  // delete row
  await Comments.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/");
});

app.listen(8080);
console.log("Server is listening on port 8080");
