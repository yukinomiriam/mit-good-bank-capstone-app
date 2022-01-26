const db = require("../model");
const User = db.user;

// -- logic to get user/account details

//find user by id
exports.getById = (req, res) => {
  console.log("called: getById");
  User.findById(req.params.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        message: "User found!",
        data: { user: user },
      });
    }
  });
};

//get user's balance by id
exports.getUserBalanceById = (req, res) => {
  console.log("called: getUserBalanceById");
  User.findById(req.params.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        data: { balance: user.balance },
      });
    }
  });
};

// get's all the users
exports.getAll = (req, res) => {
  console.log("called: getAll");
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
        message: "Users list found!",
        data: { movies: moviesList },
      });
    }
  });
};

//update's user balance by id
exports.updateUserBalanceById = (req, res) => {
  console.log("called: updateUserBalanceById");
  User.findByIdAndUpdate(
    req.params.id,
    { balance: Number(req.body.balance) },
    function (err, user) {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "Account balance has been updated successfully!",
        });
      }
    }
  );
};
