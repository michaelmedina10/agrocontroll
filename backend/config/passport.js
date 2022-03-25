const { authSecret } = process.env;
const { session } = require("passport");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;
const userRepository = require("../model/userRepository");

module.exports = (app) => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    userRepository
      .getById(payload.id)
      // done(erro?, e o que retornar)
      .then((user) => done(null, user ? { ...payload } : false))
      .catch((err) => done(err, false));
  });

  passport.use(strategy);
  return {
    authenticate: () => passport.authenticate("jwt", { session: false }),
  };
};
