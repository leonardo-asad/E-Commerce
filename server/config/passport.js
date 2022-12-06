const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db/userQueries')

passport.use(new LocalStrategy(db.verifyUser));

passport.serializeUser((user, cb) => {
  return cb(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});