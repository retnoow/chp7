const routes = require('express').Router()

routes.get('/register', (req, res)=>{
    res.send('halaman login')
})

routes.post('/login', (req, res)=>{
    res.send('logic login')
})

routes.post('/register', (req, res)=>{
    res.send('login register')
})


module.exports = routes