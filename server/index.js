var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");

const PORT = process.env.PORT || 3001;

//this is a test URL
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
});

// ---------------- USER ACCOUNT -----------------------
//create account
app.get("/account/create/:name/:email/:password", (req, res) => {
  /*res.send({
    name: req.params.name,
    email: req.params.email,
    password: req.params.password,
  });*/
  dal
    .createUser(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

//login
app.get("/account/login/:email/:password", (req, res) => {
  res.send({
    email: req.params.email,
    password: req.params.password,
  });
});

// ---------------- END USER ACCOUNT -------------------

// ---------------- ALL DATA -----------------------
//login
app.get("/account/all", (req, res) => {
  dal.getAll().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});
// ---------------- ALL DATA -----------------------

//listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
