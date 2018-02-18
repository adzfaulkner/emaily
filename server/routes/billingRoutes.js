const keys = require('../config/keys');
const stripe = require('stripe')(
  keys.stripeSecretKey
);
const userService = require('../services/userService');

module.exports = app => {
  app.post('/api/payment', async (req, res) => {
    const amount = 500;

    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    const user = await userService.addCreditsToUser(req.user.data.id, amount);
    res.send(user);
  });
};
