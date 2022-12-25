const passport = require('passport');
const db = require('../db/userQueries')
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20');

passport.use(new LocalStrategy(db.verifyUser));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/users/oauth2/redirect/google`,
  scope: [ 'profile' ],
  state: true,
  proxy: true,
  },
  db.googleAuth
));

passport.serializeUser((user, cb) => {
  return cb(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});
