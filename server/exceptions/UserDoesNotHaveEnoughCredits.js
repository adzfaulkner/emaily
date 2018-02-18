const NE = require('node-exceptions');

class UserDoesNotHaveEnoughCredits extends NE.DomainException {}

module.exports = UserDoesNotHaveEnoughCredits;
