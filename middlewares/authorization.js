const { User } = require('../models')

function authorization(req, res, next) {
  User.findOne({
    where: {
      email: req.loggedInUser.email
    }
  })
    .then(data => {
      if (data.role === "admin") {
        next()
      } else {
        throw { name: 'Not Authorized' }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization