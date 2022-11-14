const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../queries/userQueries')

passport.use(new LocalStrategy(db.verifyUser));

passport.serializeUser((user, cb) => {
  return cb(null, {
    id: user.id,
    username: user.username,
    cash: user.cash
  });
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});
