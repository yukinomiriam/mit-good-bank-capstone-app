const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  //find user by ID
  app.get("/api/user/:id", [authJwt.verifyToken], controller.getById);

  //update account's balance
  app.put("/api/user/:id", [authJwt.verifyToken], controller.updateById);

  //get all the accounts
  app.get(
    "/api/user/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAll
  );
};
