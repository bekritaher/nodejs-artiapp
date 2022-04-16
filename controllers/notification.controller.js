const Notification = require('../models/notification.model')


//mrigl 
const index=(req, res, next) => 
{
    Notification.find()
    .then((notification) =>{res.json({notification})})
    .catch(error=>{res.json({error})})      
}


//mrigl 
const show = (req, res, next) => {
    let NotificationID = req.body.NotificationID
    Notification.findById(NotificationID)
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
    
        let notification= new Notification({
            titre:req.body.titre,
            date:req.body.date,
            adresse:req.body.adresse,
            description:req.body.description,
            image:req.body.image,

        })


    /* if (req.file){
            notification.image=req.file.path
        }*/
       
        notification.save()
        .then(response => {
            res.json({
                message:'notification Added Sucessfull!'
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
    let NotificationID=req.body.NotificationID
    let updateData={
        titre:req.body.titre,
        date:req.body.date,
        adresse:req.body.adresse,
        description:req.body.description,
        image:req.body.image,
        
    }
    Notification.findByIdAndUpdate(NotificationID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Notification updated successfully!'
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
    let NotificationID= req.body.NotificationID
    Notification.findByIdAndRemove(NotificationID)
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
