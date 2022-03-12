module.exports = (app) => {
  app
    .route("/agrousers")
    .get(app.controller.farmerController.get)
    .post(app.controller.farmerController.save);

  app
    .route("/agrousers/:id")
    .get(app.controller.farmerController.getById)
    .delete(app.controller.farmerController.remove)
    .put(app.controller.farmerController.update);
};
