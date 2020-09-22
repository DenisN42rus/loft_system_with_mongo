const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const User = require('../db/models/user');

const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: function (req) {
    let token = null;
    if (req && req.headers) {
      token = req.headers['authorization'];
    }
    return token;
  }
};

passport.use(
  new LocalStrategy(
    (username, password, done) => {
      User.getUserByName(username)
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          if (!user.validPassword(password)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    }
  )
);

passport.use(
  new Strategy(params, function (payload, done) {
    User.getUserById(payload.user.id)
      .then((user) => {
        if (!user) {
          return done(new Error('User not found'));
        }
        return done(null, { user: { id: user.id } });
      })
      .catch((err) => done(err));
  })
);
