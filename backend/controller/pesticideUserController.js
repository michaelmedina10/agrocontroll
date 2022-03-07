const agroUserRepository = require("../model/agroUserRepository");
module.exports = (app) => {
  const table = "agrousers";
  const save = async (req, res) => {
    const body = { ...req.body };
    try {
      const user = await agroUserRepository.selectBy(
        app,
        table,
        "email",
        body.email
      );
      if (user) {
        throw "Usuário já cadastrado";
      }
    } catch (error) {
      return res.status(500).send(error);
    }

    agroUserRepository
      .insert(app, table, body)
      .then((res) => res.status(204).send("Cadastrdo com Sucesso"))
      .catch((err) => res.status(500).send(err));
  };

  const get = (req, res) => {
    agroUserRepository
      .selectAll(app, table)
      .then((agrousers) => res.json(agrousers))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    const id = req.params.id;
    agroUserRepository
      .selectBy(app, table, "id", id)
      .then((agrouser) => res.json(agrouser));
  };

  const remove = async (req, res) => {
    const id = req.params.id;
    try {
      if (!id) throw res.status(400).send("Usuário não informado");
      const user = await agroUserRepository.selectBy(app, table, "id", id);
      if (!user) throw res.status(400).send("Usuário não encontrado");

      agroUserRepository
        .delete(app, table, "id", id)
        .then((_) => res.status(201).send(`usuário ${id} excluido com sucesso`))
        .catch((err) => res.status(500).send(err));
    } catch (error) {
      throw res.status(500).send("erro ao excluir");
    }
  };

  const update = async (req, res) => {
    const body = { ...req.body };
    const id = req.params.id;
    console.log(body);
    if (!id) throw res.status(400).send("Usuário não informado");
    const user = await agroUserRepository.selectBy(app, table, "id", id);
    if (!user) throw res.status(400).send("Usuário não encontrado");

    agroUserRepository
      .update(app, table, "id", id, body)
      .then((_) => res.status(201).send(`Usuário ${id} atualizado com sucesso`))
      .catch((err) => res.status(500).send(err));
  };

  return { get, getById, save, remove, update };
};
