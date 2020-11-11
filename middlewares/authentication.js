const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

function authentication(req, res, next) {
  const { token } = req.headers

  if (!token) {
    throw { name: "Authentication Failed" }
  } else {
    const decoded = verifyToken(token)
    // console.log(decoded)
    User.findOne({
      where: {
        email: decoded.email
      }
    })
      .then(data => {
        if (!data) {
          throw { name: "Authentication Failed" }
        } else {
          req.loggedInUser = decoded
          next()
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = authentication