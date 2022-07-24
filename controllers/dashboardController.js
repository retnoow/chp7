const {user_game, user_game_biodata} = require('../models')

module.exports = {
    getDashboard: (req, res) =>{
        user_game.findAll({
            include: user_game_biodata
          }).then(users => {
             res.render('dashboard', {users})
        })
    },

    getData: (req, res) => {
      res.render('add')
    },

    deleteData: (req, res) => {
        const {id} = req.params
    
        user_game.destroy({
          where: {id}
    
        }).then(response => {
           res.redirect('/dashboard')
        })
    },

    addData: (req,res) => {
        const { username, password, first_name, last_name, birthplace } = req.body
       
        user_game.create({
          username,
          password,
          isSuperAdmin: false
    
        }).then(user_game => {
        
        user_game_biodata.create({
          id_user: user_game.id,
          first_name,
          last_name,
          birthplace
    
        }).then(response => {
           res.redirect('/dashboard')
          })
        })
    },

    editData: (req, res) => {
        const {id} = req.params
    
        user_game.findOne({
          where: {id},
          include: user_game_biodata
    
        }).then(user => {
           res.render('edit', {user})
        })
        
    },

    editDataPost: (req, res) =>{
        const {id} = req.params
       
        const {username, password, first_name, last_name, birthplace} = req.body
    
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