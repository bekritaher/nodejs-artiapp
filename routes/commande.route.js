const express = require('express')
const router  = express.Router()

const CommandeController = require('../controllers/commande.controller')

router.get('/index',CommandeController.index)
router.post('/show',CommandeController.show)
router.get('/',CommandeController.index)
router.post('/stores',CommandeController.stores)
router.post('/delete',CommandeController.destory)

module.exports=router