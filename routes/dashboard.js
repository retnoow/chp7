const routes = require('express').Router()
const {getDashboard, getDataUser, dashboardAuth, postAddUser, deleteUser, editData, editDataPost} = require('../controllers/dashboardController')
const restrict = require('../middlewares/restrict')


routes.get('/dashboard', restrict, getDashboard)
routes.get('/add', getDataUser)
routes.post('/add', dashboardAuth)

routes.post('/user', postAddUser)
routes.get('/dashboard', getDashboard)

routes.get('/user/:id/delete', deleteUser)

routes.get('/user/:id/edit', editData)
routes.post('/user/:id/update', editDataPost)





module.exports = routes