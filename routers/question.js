const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/userController')

router.get('/', ControllerUser.renderQuestion)
router.get('/add',ControllerUser.renderAddQuestion)
router.post('/add', ControllerUser.handleAddQuestion)
router.get('/:id', ControllerUser.renderQuestionDetails)
module.exports = router