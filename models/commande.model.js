const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const panierSchema = new Schema({

        idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        idPanier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Panier'}
        
}, { timestamps: true});

const Commande = mongoose.model('Commande', panierSchema);

module.exports = Commande