const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');

const userService = {
  createUser: async (data) => {
    return await new User().save();
  },
  findUser: async (id) => {
    return await User.findOne(id);
  },
  findUserById: async (id) => {
    return await User.findById(id);
  },
  addCreditsToUser: async (id, amountPaid) => {
    const user = await userService.findUserById(id);
    user.credits += (amountPaid / 100);
    return user.save();
  },
  removeCreditsFromUser: async (user, credits) => {
    user.credits -= 1;
    return user.save();
  }
}

module.exports = userService;
