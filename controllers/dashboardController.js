const {user_game, user_game_biodata} = require('../models')
const passport = require('../lib/passport')

module.exports = {
    getDashboard: (req, res) =>{
        user_game.findAll({
            include: user_game_biodata
          }).then(users => {
             res.render('dashboard', {users})
        })
    },

    getDataUser: (req, res) => {
      res.render('add')
    },

    // to get encrypt when add new user via dashboard
    dashboardAuth: passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/add',
        failureFlash: true
    }),

    postAddUser: (req, res) =>{
        let {username, password, first_name, last_name, birthplace} = req.body
        user_game.register({username, password}) //based on views
            .then(user_game => {
                user_game_biodata.create({
                    id_user: user_game.id,
                    first_name,
                    last_name,
                    birthplace
                }). then(response => {
                    res.redirect('/dashboard')
                })
            })  
    },

    deleteUser: (req, res) => {
        let {id} = req.params
    
        user_game.destroy({
            where: {id}
        }) .then(user_game_biodata.destroy({
            where: {id}
        }) .then(response=> {
           res.redirect('/dashboard')
        }))
    },

    
    editData: (req, res) => {
        let {id} = req.params

        user_game.findOne({
          where: {id},
          include: user_game_biodata
    
        }).then(user => {
           res.render('edit', {user})
        })
        
    },

    editDataPost: (req, res) =>{
        let {id} = req.params
       
        let {username, password, first_name, last_name, birthplace} = req.body
    
        user_game.update({
          username, password
    
        }, {where: {id}}) 
    
          .then(response =>{
            user_game_biodata.update({first_name, last_name, birthplace}, 
            {where : {id_user: id}})
    
        }).then(response =>{
           res.redirect('/dashboard')
        })

    }
    
}