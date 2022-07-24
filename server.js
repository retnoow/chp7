const express = require('express')
const app = express()
const port = 3000
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/homepage')
const dashboardRoutes = require('./routes/dashboard')
const apiRoutes = require('./routes/api')
const session = require('express-session')
const flash = require('express-flash')


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use('/public', express.static("./public"))

app.use(express.json())

app.use(session({
  secret: 'ini rahasia',
  resave: false,
  saveUninitialized: false
}))

// for local strategy
const passport = require('./lib/passport')
app.use(passport.initialize())
// for jwt strategy
const passportJWT = require('./lib/passportJWT')
app.use(passportJWT.initialize())
app.use(passport.session())

app.use(flash())

// for routing
app.use(authRoutes)
app.use(homeRoutes)
app.use(dashboardRoutes)
app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})