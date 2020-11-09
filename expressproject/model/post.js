const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    userName: { type: String, required: true },

    userCountry: { type: String, required: true },

    userModeOfPay: { type: String, required: true },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    creatorName: { type: mongoose.Schema.Types.String, ref: "User", required: true },

});

module.exports = mongoose.model('table', postSchema);