const {user_game} = require('../models')

const format = (user) =>{
    const {id, username} = user
    return{
        id,
        username,
        token: user.generateToken()
    }
}

module.exports = {
    login: (req, res) =>{
        user_game.authenticate(req.body)
            .then(user => {
                res.json(format(user))
            })
    },
    whoami: (req, res) =>{
        const currentUser = req.user
        res.json(currentUser)
    },
    createRoom: (req, res) =>{
        
    },
    fight: (req, res) => {

    }
}