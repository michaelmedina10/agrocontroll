const admin = require("./admin");

module.exports = (app) => {
  app.post("/signin", app.controller.auth.signin);
  app.post("/validateToken", app.controller.auth.validateToken);

  app
    .route("/agrousers")
    .all(app.config.passport.authenticate())
    .get(admin(app.controller.farmerController.get))
    .post(admin(app.controller.farmerController.save));

  app
    .route("/agrousers/:id")
    .all(app.config.passport.authenticate())
    .get(app.controller.farmerController.getById)
    .delete(app.controller.farmerController.remove)
    .put(app.controller.farmerController.update);

  app
    .route("/grouped/pesticida")
    .all(app.config.passport.authenticate())
    .get(app.controller.farmerController.getCountedPesticida);

  app
    .route("/grouped/estado")
    .all(app.config.passport.authenticate())
    .get(app.controller.farmerController.getCountedState);

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(app.controller.userController.save)
    .get(app.controller.userController.get);

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .get(app.controller.userController.getById)
    .delete(app.controller.userController.remove)
    .put(app.controller.userController.update);
};
