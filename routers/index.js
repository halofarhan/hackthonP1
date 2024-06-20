const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller')
const Usercontroller = require('../controllers/userController')


const answerRouters = require('./answer')
const categoryRouter = require('./category')
const profileRouter = require('./profile')
const questionRouter = require('./question')
const userRouter = require('./user')

router.use('/answers' , answerRouters)
router.use('/categories' , categoryRouter)
router.use('/profiles' , profileRouter)
router.use('/questions' , questionRouter)
router.use('/users', userRouter)

router.get('/' ,Controller.renderHomePage)
router.get('/register' , Usercontroller.registerForm )
router.post('/register' , Usercontroller.postRegister)


router.get('/login' , Usercontroller.renderloginForm)
router.get('/register' , Usercontroller.handelLoginForm)




module.exports = router