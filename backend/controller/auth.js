const { authSecret } = process.env;
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const userRepository = require("../model/userRepository");

module.exports = (app) => {
  const signin = async (req, res) => {
    try {
      if (!req.body.email || !req.body.senha) {
        return res.status(400).send("Informe o usuário e senha");
      }

      const user = await userRepository.getByEmail(req.body.email);
      if (!user) return res.status(400).send("Usuário não encontrado!");

      const isMatch = bcrypt.compareSync(req.body.senha, user.senha);
      if (!isMatch) return res.status(401).send("E-mail ou senha inválidos");

      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: user.id,
        name: user.nome,
        email: user.email,
        admin: user.admin,
        iat: now,
        exp: now + 60 * 60 * 24 * 3,
      };

      res.json({
        ...payload,
        token: jwt.encode(payload, authSecret),
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const validateToken = async (req, res) => {
    try {
      const userData = req.body || null;

      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        if (token.exp * 1000 > Date.now()) {
          return res.send(true);
        }
      }
    } catch (error) {
      return res.send(false);
    }
  };

  return { signin, validateToken };
};
