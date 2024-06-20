const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/userController')



router.get('/', ControllerUser.renderQuestion)
module.exports = router