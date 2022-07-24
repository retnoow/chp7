const routes = require('express').Router()
const {getDashboard} = require('../controllers/dashboardController')
const restrict = require('../middlewares/restrict')


routes.get('/dashboard', restrict, getDashboard)


module.exports = routes