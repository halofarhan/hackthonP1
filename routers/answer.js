const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/userController')

router.get("/:id/like", ControllerUser.handleLike)
router.post("/:id/add", ControllerUser.handleAddAnswer)

module.exports = router