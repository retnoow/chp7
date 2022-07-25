const {user_game, user_game_biodata} = require('../models')
const passport = require('../lib/passport')

module.exports = {
    getLogin: (req, res) =>{
        res.render('login')
    },
    getRegister: (req, res) =>{
        res.render('register')
    },
    postLogin: passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
    }),
    postRegister: (req, res) =>{
        let {username, password, first_name, last_name, birthplace} = req.body
        user_game.register({username, password}) //based on views
            .then(user_game => {
                user_game_biodata.create({
                    id_user: user_game.id,
                    first_name,
                    last_name,
                    birthplace
                }). then(response => {
                    res.redirect('/login')
                })
            })  
    }
}


