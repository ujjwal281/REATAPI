const mongoose = require('mongoose');
const subscribersSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    subscribedToChannel: {
        type: String,
        required: true
    },

    subscriberData: {
        type: Date,
        required: true,
        default : Date.now
    }

})

module.exports = mongoose.model('Subscribers', subscribersSchema);