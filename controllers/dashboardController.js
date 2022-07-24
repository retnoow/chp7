const {user_game, user_game_biodata} = require('../models')

module.exports = {
    getDashboard: (req, res) =>{
        user_game.findAll({
            include: user_game_biodata
          }).then(users => {
             res.render('dashboard', {users})
        })
    }
}