const passport = require('passport');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      const token = jwt.sign(
        {
          data: {
            id: req.user.id
          },
          exp: keys.jwtExpires.valueOf()
        },
        keys.jwtSecret
      );

      res.cookie('jwt', token, { maxAge: 900000, httpOnly: false });
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.cookie('jwt', null, { maxAge: -1, httpOnly: false });
    res.redirect('/');
  });

  app.get('/api/user', async (req, res) => {
    res.send(await userService.findUserById(req.user.data.id));
  });
};
