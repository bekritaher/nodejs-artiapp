const Badge = require('../models/badge.model')


//mrigl 
const index=(req, res, next) => 
{
    Badge.find()
    .then((badge) =>{res.json({badge})})
    .catch(error=>{res.json({error})})      
}


//mrigl 
const show = (req, res, next) => {
    let BadgeID = req.body.BadgeID
    Badge.findById(BadgeID)
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
    let BadgeID=req.body.BadgeID
    let updateData={
        nom:req.body.nom,
        email:req.body.email,
        adresse:req.body.adresse,
        image:req.body.image,
    }
    Badge.findByIdAndUpdate(BadgeID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Badge updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'an error Occured!'
    })
})
}


//mrigll
const destory=(req,res,next) =>{
    let BadgeID= req.body.BadgeID
    Badge.findByIdAndRemove(BadgeID)
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
    index,show,stores,update,destory
}
