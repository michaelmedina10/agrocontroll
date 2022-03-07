module.exports = (app) => {
  app
    .route("/agrousers")
    .get(app.controller.pesticideUserController.get)
    .post(app.controller.pesticideUserController.save);

  app
    .route("/agrousers/:id")
    .get(app.controller.pesticideUserController.getById)
    .delete(app.controller.pesticideUserController.remove)
    .put(app.controller.pesticideUserController.update);
};
