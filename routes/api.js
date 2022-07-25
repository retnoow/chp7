const routes = require('express').Router()
const {login, whoami, fight, createRoom, winner, join} = require('../controllers/apiController')
const restrictJWT = require('../middlewares/restrictJWT')

routes.post('/login', login)
routes.get('/whoami', restrictJWT, whoami)
routes.post('/create-room', restrictJWT, createRoom)
routes.post('/join/:roomid', restrictJWT, join)
routes.post('/fight/:roomid', restrictJWT, fight)
routes.get('/winner/:roomid', winner)

module.exports = routes