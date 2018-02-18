const moment = require('moment');

module.exports = {
  googleClientID:
    '767944435429-gch4ffs941ufr60ilqi28fcom6lmji8l.apps.googleusercontent.com',
  googleClientSecret: 'UPDlPxTX28vp4lOA-s6n6IqH',
  mongoURI: 'mongodb://adam:password@emaily-mongo:27017/emaily-dev',
  jwtSecret: 'shhhhhhhhhhhhh',
  jwtExpires: moment().add(1, 'hour'),
  stripePublishableKey: 'pk_test_SBNcVd44pGOtY75NFWAJcJIG',
  stripeSecretKey: 'sk_test_EXy10pE2W3CHYGjLB6KQOucE',
  sendGridKey:
    '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'
};
