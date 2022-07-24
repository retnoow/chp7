const routes = require('express').Router()
const {getDashboard} = require('../controllers/dashboardController')

routes.get('/dashboard', getDashboard)


module.exports = routes