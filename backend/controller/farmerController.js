const farmerRepository = require("../model/farmerRepository");
module.exports = (app) => {
  const save = async (req, res) => {
    const body = { ...req.body };
    try {
      const user = await farmerRepository.getByEmail(body.email);

      if (user) throw "Usuário já cadastrado";
      farmerRepository
        .insert(body)
        .then((_) => res.status(201).send("Cadastrado com Sucesso"))
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const get = (req, res) => {
    try {
      farmerRepository
        .selectAll()
        .then((agrousers) => res.json(agrousers))
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const getById = (req, res) => {
    try {
      const id = req.params.id;
      farmerRepository.getById(id).then((agrouser) => res.json(agrouser));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const remove = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) throw res.status(422).send("ID não informado");
      const user = await farmerRepository.getById(id);
      if (!user) throw res.status(404).send("Usuário não encontrado");

      farmerRepository
        .delete(id)
        .then((_) => res.send(`usuário ${id} excluido com sucesso`))
        .catch((err) => res.status(422).send(err));
    } catch (error) {
      throw res.status(400).send(error);
    }
  };

  const update = async (req, res) => {
    try {
      const body = { ...req.body };
      const id = req.params.id;
      if (!id) throw res.status(422).send("ID não informado");
      const user = await farmerRepository.getById(id);
      if (!user) throw res.status(404).send("Usuário não encontrado");

      farmerRepository
        .update(id, body)
        .then((_) =>
          res.status(201).send(`Usuário ${id} atualizado com sucesso`)
        )
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  return { get, getById, save, remove, update };
};
