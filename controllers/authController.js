module.exports = {
    getLogin: (req, res) =>{
        res.render('login')
    },
    getRegister: (req, res) =>{
        res.render('register')
    },
    postLogin: (req, res) =>{
        res.send('register')
    },
    postRegister: (req, res) =>{
        let { username, password, firstName, lastName, birthplace} = req.body
        res.send('register')
    }
}