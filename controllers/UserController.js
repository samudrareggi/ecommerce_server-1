const { User } = require("../models")
const { comparePassword } = require("../helpers/bcryptjs")
const { signToken } = require("../helpers/jwt")

class UserController {
  static login(req, res, next){
    const {email, password} = req.body
    
    User.findOne({
      where: {
        email: email
      }
    })
      .then(data => {
        if (!data) {
          throw { name: "ErrorLogin" }
        } else if (!comparePassword(password, data.password)) {
          throw { name: "ErrorLogin" }
        } else {
          const access_token = signToken({
            id: data.id,
            email: data.email,
            role: data.role
          })
          res.status(200).json({ access_token })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController