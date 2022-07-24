const express = require('express')
const app = express()
const port = 3000
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/homepage')
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
// app.use(passportJWT.initialize())
app.use(passport.session())
app.use(flash())

// for routing
app.use(authRoutes)
app.use(homeRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})