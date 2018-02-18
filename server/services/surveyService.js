const mongoose = require('mongoose');
require('../models/Survey');
const Survey = mongoose.model('surveys');
const userService = require('./userService');
const UserDoesNotHaveEnoughCreditsException = require('../exceptions/UserDoesNotHaveEnoughCredits');
const mailerService = require('./mailerService');
const surveyTemplate = require('./emailTemplates/surveyTemplate');

const userCanCreateSurvey = user => {
  return user.credits > 0;
};

const createSurveyModel = (data, user) => {
  const { title, subject, body, recipients } = data;
  return new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: user,
    dateSent: Date.now()
  });
};

module.exports = {
  createSurvey: async (data, userId) => {
    const user = await userService.findUserById(userId)

    if (userCanCreateSurvey(user) === false) {
      throw new UserDoesNotHaveEnoughCreditsException();
    }

    const survey = createSurveyModel(data, user);
    const response = await mailerService.sendSurvey(survey, surveyTemplate(survey));
    await survey.save();
    return userService.removeCreditsFromUser(user, 1);
  }
};
