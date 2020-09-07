const express = require("express");
const path = require("path");

const port = 10000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

var toDoList = [
  {
    DESCRIPTION: "work1",
    CATEGORY: "Personal",
    DATE: "25/08/2020",
  },
  {
    DESCRIPTION: "work2",
    CATEGORY: "Official",
    DATE: "25/08/2020",
  },
  {
    DESCRIPTION: "work3",
    CATEGORY: "Social",
    DATE: "25/08/2020",
  },
  {
    DESCRIPTION: "work4",
    CATEGORY: "Personal",
    DATE: "25/08/2020",
  },
];
app.get("/", function (req, res) {
  return res.render("home", {
    title: "To Do List",
    to_do_list: toDoList,
  });
});

//this will push to do list data from form
app.post("/make-to-do-list", function (req, res) {
  // toDoList.push({
  //   DESCRIPTION: req.body.DESCRIPTION,
  //   CATEGORY: req.body.CATEGORY,
  //   DATE: req.body.DATE,
  // });
  toDoList.push(req.data);
  return res.redirect("back");
});

app.get("/delete-task/:DESCRIPTION", function (req, res) {
  let DESCRIPTION = req.params.DESCRIPTION;

  let taskIndex = toDoList.findIndex((work) => work.DESCRIPTION == DESCRIPTION);

  if (taskIndex != -1) {
    toDoList.splice(taskIndex, 1);
  }
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running server", err);
  }
  console.log("running at port", port);
});
