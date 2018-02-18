const keys = require('../config/keys');
const stripe = require('stripe')(
  keys.stripeSecretKey
);
const surveyService = require('../services/surveyService');
const UserDoesNotHaveEnoughCreditsException = require('../exceptions/UserDoesNotHaveEnoughCredits');

module.exports = app => {
  app.post('/api/survey', async (req, res) => {
    try {
      const user = await surveyService.createSurvey(req.body, req.user.data.id);
      res.send(user);
    } catch (err) {
      res.status(422).send(err);

    }
  });
};
