const routes = require('express').Router()
const {getLogin, getRegister, postRegister, postLogin} = require('../controllers/authController')

routes.get('/login', getLogin)
routes.post('/login', postLogin)

routes.get('/register', getRegister)
routes.post('/register', postRegister)

module.exports = routes