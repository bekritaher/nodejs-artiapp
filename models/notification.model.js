const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
    nom: {
        type: String,
    },
    email: {
        type: String,
    },
    adresse: {
        type: String,
    },
    image: {
        type: String,
    },
}, { timestamps: true});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification