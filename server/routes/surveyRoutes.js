const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const keys = require('../config/keys');
const stripe = require('stripe')(
  keys.stripeSecretKey
);
const surveyService = require('../services/surveyService');

module.exports = app => {
  app.get('/api/survey/:surveyId/:choice', (req, res) => {
    res.send('Thank you for your feedback!');
  });

  app.post('/api/survey', async (req, res) => {
    try {
      const user = await surveyService.createSurvey(req.body, req.user.data.id);
      res.send(user);
    } catch (err) {
      res.status(422).send(err);

    }
  });

  app.get('/api/survey', async (req, res) => {
    const surveys = await surveyService.getSurveys(req.user.id);
    console.log(surveys);
    res.send(surveys);
  });

  app.post('/api/survey/notification', (req, res) => {
    const p = new Path('/api/survey/:surveyId/:choice');
    _.map(req.body, ({email, url}) => {
      console.log('the url', url);
      console.log('the email', url);
      const match = p.test(new URL(url).pathname);
      if (match) {
        surveyService.recipientResponded(match.surveyId, email, match.choice);
      }
    });
  });
}
