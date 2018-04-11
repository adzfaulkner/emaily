const keys = require('../config/keys');
const ejwt = require('express-jwt');

module.exports = app => {
  app.use(
    ejwt({ secret: keys.jwtSecret }).unless({
      path: new RegExp(
        [
          '/auth/google/callback',
          '/auth/google',
          '/api/logout',
          '/api/survey/notification',
          '/api/survey/thanks',
          '\\/api\\/survey\\/[a-z0-9]{24,}\\/(yes|no)'
        ].join('|')
      )
    })
  );

  app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ code: 401, embedded: 'Unauthorised user' });
    }
    next();
  });
};
