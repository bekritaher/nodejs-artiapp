const express = require('express')
const router  = express.Router()

const NotificationController = require('../controllers/notification.controller')

router.get('/index',NotificationController.index)
router.post('/show',NotificationController.show)
router.get('/',NotificationController.index)
router.post('/stores',NotificationController.stores)
router.post('/update',NotificationController.update)
router.post('/delete',NotificationController.destory)

module.exports=router