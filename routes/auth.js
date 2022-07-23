const routes = require('express').Router()
const {getLogin, getRegister} = require('../controllers/authController')

routes.get('/login', getLogin)
routes.get('/register', getRegister)

module.exports = routes