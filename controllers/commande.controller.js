const Commande = require('../models/commande.model')


//mrigl 
const index=(req, res, next) => 
{
    Commande.find({ idUser : req.headers.idUser })
        .exec(function(err, data) {
    if(err) res.status(500).send(err);
    else res.send(data);
  })
      //  console.log(req.headers)   
}


//mrigl 
const show = (req, res, next) => {
    let Commandeid = req.body.Commandeid
    Evenement.findById(Commandeid)
    .then(reponse => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'an error Occured'
        })
    })
}


//mrigl 
const stores = (req, res, next) => {
    
    const {/* idcommande,*/ idUser,idPanier} = req.body

    const Commande = new Commande({
        /*idcommande: idcommande,*/
        idUser: idUser,
        idPanier:idPanier
    })

    Commande.save().then(response => {res.json(Commande)})

 }

   
//mrigll
const destory=(req,res,next) =>{
  var id = req.body._id;
  Commande.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();

  });
}

module.exports={
    index,show,stores,destory
}
