const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const badgeSchema = new Schema({
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
    active: {
        type: Boolean,
    },
}, { timestamps: true});

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge