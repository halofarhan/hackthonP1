
class Controller {

    static async renderHomePage(request , respond){
        try {
            
            respond.render('homePage.ejs')         
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = Controller