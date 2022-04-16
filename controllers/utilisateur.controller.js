const { colours } = require("nodemon/lib/config/defaults");
const { Art } = require("../models/art.model");
const { Utilisateur } = require("../models/utilisateur.model");

//afficher

const index=(req, res, next) => 
{




    Utilisateur.find()
    .then((utilisateur) =>{
    
        for (let i=0 ; i<utilisateur.length;i++) {
          if (utilisateur[i].arts.length==0){
              utilisateur.splice(i,1);
              i--; 
          }
        }
        
        res.json({utilisateur})
    
    
    })
    .catch(error=>{res.json({error})})      
}




///////////////


//  const test=(req, res, next) => 
//  {
//     Art.findById(utilisateur.arts[i], function (err, art) {
//         if (err)
//             res.send(err)
         
//         x.push(art)
//        if (i==utilisateur.arts.length-1)
//        {res.json(x); }
       
    
       
//     })    
//  }



const  getarts= (req, res, next)  => 
{
    var x =[]
    console.log(req.body.id)


   // var utilisateur = (await Utilisateur.findById(other_id, 'name photo').exec()).toObject();

 Utilisateur.findOne({_id:req.body.id}, (err,utilisateur)=>{
//   console.log(utilisateur.arts);
//   console.log(utilisateur.nom);
    if (utilisateur.arts.length > 0){
    for (let i=0 ; i<utilisateur.arts.length;i++) {
        Art.findById(utilisateur.arts[i], function (err, art) {
            if (err)
                res.send(err)
             
            x.push(art)
           if (i==utilisateur.arts.length-1)
           {res.json(x); }
           
        
           
        })
        }
    }
    else {res.json(x);}
})
}



//ajouter

const add = (req, res, next) => {

    console.log(req.file);
        let utilisateur= new Utilisateur({
            nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            password:req.body.password,
            numero:req.body.numero,
            bio:req.body.bio,
            datenaissance:req.body.datenaissance,
            adresse:req.body.adresse,
            role:req.body.role,
            image: req.body.image
    
        });
    
            
        console.log(utilisateur)
    
        utilisateur.save()
        .then(response => {
            res.json({
                message:'Utilisateur Added Sucessfull!'
            })
        })
    .catch(eroor => {
        res.json({
            message:'An error Occured!'
        })
    })
    }
    
//modifier
const update =(req, res, next)=>
{
    let id=req.body.id
    let updateData={
        nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            password:req.body.password,
            numero:req.body.numero,
            bio:req.body.bio,
            datenaissance:req.body.datenaissance,
            adresse:req.body.adresse,
            role:req.body.role,
            image: req.body.image
    }
    Utilisateur.findByIdAndUpdate(id, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Utilisateur updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'An error Occured!'
    })
})
}


//supprimer

const destroy=(req,res,next) =>{
    let id= req.body.id
    Utilisateur.findByIdAndRemove(id)
    .then(()=>{
        req.json({
            message: 'Utilisateur deleted successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message:'An error Occured!'
        })
    })
}


const signup=(req,res)=>{
    Utilisateur.findOne({email:req.body.email},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            
            if(utilisateur==null){
                const utilisateur = Utilisateur({
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    email:req.body.email,
                    password:req.body.password,
                    numero:req.body.numero,
                    bio:req.body.bio,
                    datenaissance:req.body.datenaissance,
                    adresse:req.body.adresse,
                    role:req.body.role,
                    image:req.body.image
                })
                utilisateur.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.status(500).json(err)
                    }else{
                        if(utilisateur==null){ res.status(401).json({
                            message:'User is null!'
                        })}
                        else{
                        console.log(utilisateur)
                        res.status(200).json(utilisateur)
                    }
                }
                })
            }else{

                res.status(404).json({
                    message:'Email already exists!'
            })   
            }
        }
        console.log("statusCode: ", res.statusCode);
    })
    
}



const emailcheck=(req,res)=>{
  
    Utilisateur.findOne({email:req.body.email},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
            
          
        }else{
            
            if(utilisateur==null){ res.status(200).json({
                message:'Email available'
            });   }
            else{
                res.status(401).json({
                    errorMessage: "Email unavailable.",
                  
                })
               
            }
           
        }
        console.log("statusCode: ", res.statusCode);
    })
}






const signin=(req,res)=>{
    Utilisateur.findOne({email:req.body.email,password:req.body.password},(err,utilisateur)=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
          
        }else{
            if(utilisateur==null){ res.status(401).json({
                message:'Wrong informations'
            })}
            else{
            res.status(200).json(utilisateur)  
            console.log(utilisateur)
            }
           
        }
        console.log("statusCode: ", res.statusCode);
    })
}





module.exports={
    index,add,update,destroy,signin,signup,emailcheck,getarts

}




