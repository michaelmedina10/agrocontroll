module.exports = (app) => {
  app.post("/signin", app.controller.auth.signin);
  app.post("/validateToken", app.controller.auth.validateToken);

  app
    .route("/agrousers")
    .get(app.controller.farmerController.get)
    .post(app.controller.farmerController.save);

  app
    .route("/agrousers/:id")
    .get(app.controller.farmerController.getById)
    .delete(app.controller.farmerController.remove)
    .put(app.controller.farmerController.update);

  app
    .route("/grouped/pesticida")
    .get(app.controller.farmerController.getCountedPesticida);

  app
    .route("/grouped/estado")
    .get(app.controller.farmerController.getCountedState);

  app
    .route("/users")
    .post(app.controller.userController.save)
    .get(app.controller.userController.get);

  app
    .route("/users/:id")
    .get(app.controller.userController.getById)
    .delete(app.controller.userController.remove)
    .put(app.controller.userController.update);
};
