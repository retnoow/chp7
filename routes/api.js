const routes = require('express').Router()
const {login, whoami, fight, createRoom} = require('../controllers/apiController')
const restrictJWT = require('../middlewares/restrictJWT')

routes.post('/login', login)
routes.get('/whoami', restrictJWT, whoami)
routes.post('/create-room', createRoom)
routes.post('/fight/:roomid', fight)

module.exports = routes