const keys = require('../config/keys');
const ejwt = require('express-jwt');

module.exports = app => {
  app.use(
    ejwt({ secret: keys.jwtSecret }).unless({
      path: ['/auth/google/callback', '/auth/google', '/api/logout']
    })
  );

  app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ code: 401, embedded: 'Unauthorised user' });
    }
    next();
  });
};
