
const { request } = require('express')
const{ Profile , User  } = require('../models/index')

class UserController{
 ///////////////////////////////////////////////// REGISTER FORM ///////////////////////////////////////////////
    static async registerForm(request , respond){
        try {
            const gender = ['Male' ,'Female']
            respond.render('registerForm.ejs' , {gender})
        } catch (error) {
            console.log(error)
            respond.send(error)
        }
    }
    static async postRegister(request , respond){
        try {
            const rate = 0
            const lastCtive = '0'       
            const {email , password , role , firstName , lastName , latestEducation , workAt , gender}= request.body
            // console.log(request.body)
           const userData = await User.create({
                email,
                password,
                role
            })
            const UserId = userData.id
            // const{firstName , lastName , latestEducation , workAt , gender} = request.body
            await Profile.create({
                UserId,
                firstName,
                lastName,
                lastActive : lastCtive,
                rating: rate,
                workAt,
                latestEducation,
                gender: gender

            })
            respond.redirect('/')
        } catch (error) {
            console.log(error)
            respond.send(error)
        }
    }
///////////////////////////////////////////////////////////// USER LOGIN FORM ///////////////////////////////////////////    

    static async renderloginForm(request , respond){
        try {
            respond.render('loginForm.ejs')
        } catch (error) {
            
        }
    }
    static async handelLoginForm(request , respond){
        try {
            
        } catch (error) {
            console.log(error)
            respond.send(error)
        }
    }


}

module.exports = UserController