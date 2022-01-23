const db = require("../model");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

// -- logic to get user accounts/details

exports.getById = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        message: "User found!!!",
        data: { user: user },
      });
    }
  });
};

exports.getAll = (req, res) => {
  let usersList = [];
  User.find({}, function (err, users) {
    if (err) {
      next(err);
    } else {
      for (let user of users) {
        usersList.push({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: user.roles,
        });
      }
      res.json({
        status: "success",
        message: "Users list found!!!",
        data: { movies: moviesList },
      });
    }
  });
};

exports.updateById = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  User.findByIdAndUpdate(
    req.params.id,
    { balance: Number(req.body.balance) },
    function (err, user) {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "Account balance has been updated successfully!!!",
          data: null,
        });
      }
    }
  );
};
