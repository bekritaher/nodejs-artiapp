const express = require("express");
const multer=require('multer')
const path= require('path');
const router = express.Router();

const utilisateurController = require("../controllers/utilisateur.controller");
const { Utilisateur } = require("../models/utilisateur.model");

router.get("/all",utilisateurController.index)
router.post("/add",utilisateurController.add)
router.put("/update/:id",utilisateurController.update)
router.delete("/delete/:id",utilisateurController.destroy)
router.post('/signup',utilisateurController.signup)
router.post('/signin',utilisateurController.signin)
router.post('/emailcheck',utilisateurController.emailcheck)
router.post("/getarts",utilisateurController.getarts)



////Image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/utilisateurs')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
  router.post('/uploadutilisateur', upload.single('myFile'), async(req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next("An error has occured!")
    }
  })
  
  router.get('/image',async(req, res)=>{
   const image = await Image.find()
   res.json(image)
   
  })



module.exports = router;