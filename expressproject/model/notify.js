const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    message: { type: String, required: true },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    creatorName: { type: mongoose.Schema.Types.String, ref: "User", required: true },

});

module.exports = mongoose.model('notify', postSchema);