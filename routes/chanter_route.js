const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const chanterController = require('../controller/chanter_controller')
const {verifyToken} = require('../utility/verifyToken')
router.post('/add-chanter',body("reference").isString().isLength({min:5,max:15}).withMessage("type valid reference"),body('details').isLength({max:50}).withMessage('type valid details'),body('type').isString().isLength({min:3,max:3}).withMessage('type valid type'),body("addrese").isString().isLength({min:10,max:30}).withMessage("type valid addrese"),chanterController.signUp)
router.get('/chanter-info',verifyToken,chanterController.chanterInfo)
module.exports = router
