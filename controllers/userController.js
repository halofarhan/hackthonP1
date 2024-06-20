
const { request } = require('express')
const{ Profile , User, Question, Category, Answer } = require('../models/index')
const { Op, literal } = require("sequelize")


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

    static async renderQuestion(request,respond){
        try {
            let querySearch = request.query.search || ""
            console.log(request.query.filter, "<<<<");
            let filtered = {
                question: {
                    [Op.iLike]: `%${querySearch}%`
                }, 
                CategoryId: request.query.filter
            }
            if (!request.query.filter){
                filtered = {
                    question: {
                        [Op.iLike]: `%${querySearch}%`
                    }
                }
            }
            let profiles = await Profile.findAll()
            let question = await Question.findAll({
                include: Category,
                where: filtered
            })
            respond.render("question.ejs", {question, profiles})
            
        } catch (error) {
            console.log(error);
        }
    }

    static async renderQuestionDetails(request,respond){
        try {
            let id = request.params.id
            let question = await Question.findByPk(id)
            let answer = await Answer.findAll({
                where: {
                    QuestionId : id
                }
            })
            // console.log(question);
            respond.render("answer.ejs", {question, answer})
        } catch (error) {
            
        }
    }

    static async handleAddAnswer(request,respond){
        try {
            let id = request.params.id
            let {answer} = request.body
            let answered = await Answer.create({
                answer,
                QuestionId: id
            })

            respond.redirect(`/questions/${id}`)
        } catch (error) {
            
        }
    }

    static async renderAddQuestion(request,respond){
        try {
            respond.render("addQuestion.ejs")
        } catch (error) {
            console.log(error);
        }
    }

    static async handleAddQuestion(request,respond){
        try {
            let {question,CategoryId} = request.body
            // console.log(request.body);
            await Question.create({
                question,
                CategoryId
            })
            respond.redirect('/questions')
        } catch (error) {
            console.log(error);
        }
    }

    static async handleLike(request,respond){
        try {
            let id = request.params.id
            console.log(id, "<<<<<<<<<<");
            const one = await Answer.findByPk(id)
            await Answer.update(
                { like: literal('like + 1') },
                { where: { id } }
            );
            respond.redirect(`/question/${one.QuestionId}`)
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UserController