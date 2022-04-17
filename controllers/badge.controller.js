const Badge = require('../models/badge.model')


//mrigl 
const index=(req, res, next) => 
{
    Badge.find()
    .then((badge) =>{res.json({badge})})
    .catch(error=>{res.json({error})})      
}


//mrigl 
/*const show = (req, res, next) => {
        req= Badge.findOne({ active: true })
         .then((reponse) => {
             res.json({
               reponse,
             }),
               console.log("azerty", reponse);
           })
           .catch((error) => { 
             res.json({
               message: "an error Occured",
             });
           });
       };*/

//mrigl 
const stores = (req, res, next) => {
    
        let badge= new Badge({
            nom:req.body.nom,
            email:req.body.email,
            adresse:req.body.adresse,
            image:req.body.image,

        })


    /* if (req.file){
            Badge.image=req.file.path
        }*/
       
        badge.save()
        .then(response => {
            res.json({
                message:'badge Added Sucessfull!'
            })
        })
    .catch(error => {
        res.json({
            message:'an error Occured here!'
        })
    })
    }
    



//mrigll
const update =(req, res, next)=>
{
    let id = req.params.id;

    let updateData={
        nom:req.body.nom,
        email:req.body.email,
        adresse:req.body.adresse,
        image:req.body.image,

    }
    Badge.findByIdAndUpdate(id, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Badge updated successfully!'
        })
    })
.catch(error =>{
    res.statusCode = 500;
    res.json({
        message:'an error Occured!'
    })
})
}


//mrigll
const destory=(req,res,next) =>{
    let _id = req.params.id;
    Badge.findByIdAndDelete(_id)
    .then(()=>{
        req.json({
            message: 'Delete sucesse!'
        })
    })
    .catch(error =>{
        res.json({
            message:'an error Occured!'
        })
    })
}

module.exports={
    index,stores,update,destory
}
