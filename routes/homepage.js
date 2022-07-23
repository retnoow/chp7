const routes = require('express').Router()
const {home} = require('../controllers/homepageControllers')

routes.get('/', home)


module.exports = routes