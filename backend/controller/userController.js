const bcrypt = require("bcrypt-nodejs");
const userRepository = require("../model/userRepository");

module.exports = (app) => {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    try {
      const body = { ...req.body };
      const email = req.body.email;
      const user = await userRepository.getByEmail(email);
      if (user) throw res.status(400).send("Usuário já cadastrado");
      body.senha = encryptPassword(body.senha);
      userRepository
        .insert(body)
        .then((_) => res.status(201).send("Cadastrado com Sucesso"))
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const update = async (req, res) => {
    try {
      const body = { ...req.body };
      const id = req.params.id;
      const user = await userRepository
        .getById(id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).send(err));
      if (!user)
        throw res.status(400).send("Usuário não informado ou não cadastrado");
      body.senha = encryptPassword(body.senha);
      userRepository
        .update(id, body)
        .then((_) =>
          res.status(201).send(`Usuário ${id} atualizado com sucesso`)
        )
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const get = (req, res) => {
    try {
      userRepository
        .selectAll()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const getById = (req, res) => {
    try {
      const id = req.params.id;
      if (!id) throw res.status(400).send("Usuário não encontrado");
      userRepository
        .getById(id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const remove = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await userRepository
        .getById(id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).send(err));
      if (!user)
        throw res.status(400).send("Usuário não informado ou não cadastrado");

      userRepository
        .delete(id)
        .then((_) => res.send("Usuário excluido com Sucesso"))
        .catch((err) => res.status(422).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  return { save, get, getById, remove, update };
};
