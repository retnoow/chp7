const routes = require('express').Router()
const {getDashboard, getData, deleteData, addData, editData, editDataPost } = require('../controllers/dashboardController')
const restrict = require('../middlewares/restrict')


routes.get('/dashboard', restrict, getDashboard)
routes.get('/add', getData)
routes.post('/user', addData)
routes.get('/user/:id/delete', deleteData)

routes.get('/user/:id/edit', editData)
routes.post('/user/:id/update', editDataPost)


module.exports = routes