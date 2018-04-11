const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

const createTrackingSettings = () => {
  const trackingSettings = new helper.TrackingSettings();
  trackingSettings.setClickTracking(new helper.ClickTracking(true, true));
  return trackingSettings;
};

const createPersonalize = recipients => {
  const personalize = new helper.Personalization();
  recipients.forEach(email => {
    personalize.addTo(email);
  });
  return personalize;
};

const send = async (mailer) => {
  const sgApi = sendgrid(keys.sendGridKey);
  const request = sgApi.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mailer.toJSON()
  });
  return await sgApi.API(request);
};

module.exports = {
  sendSurvey: async (survey, content) => {
    let mailer = new helper.Mail();
    mailer.from_email = new helper.Email('no-reply@emaily.com');
    mailer.subject = survey.subject;
    mailer.addContent(new helper.Content('text/html', content));
    mailer.addTrackingSettings(createTrackingSettings());
    mailer.addPersonalization(createPersonalize(survey.recipients));
    return await send(mailer);
  }
};
