const mongoose = require("mongoose");
const utilisateurSchema = mongoose.Schema(
    {
        nom:{type:String,},
        prenom:{type:String,},
        email:{type:String,},
        password:{type:String,},
        numero:{type:String,},
        bio:{type:String,},
        datenaissance:{type:String,},
        adresse:{type:String,},
        role:{type:String,},
        image:{type:String,},
        arts:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Art"
            }
          ],

    }
);

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = { Utilisateur }