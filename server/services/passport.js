const passport = require('passport');
const userService = require('./userService');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await userService.findUser({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      done(null, await userService.createUser({ googleId: profile.id }));
    }
  )
);
