const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    userName: { type: String, required: true },

    userCountry: { type: String, required: true },

    userModeOfPay: { type: String, required: true }

});

module.exports = mongoose.model('table', postSchema);