const passportJWT = require('../lib/passportJWT')

module.exports = passportJWT.authenticate('jwt', {
    session: false
})
