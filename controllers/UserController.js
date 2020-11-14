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
          throw { name: "Wrong Email/Password", status: '401' }
        } else if (!comparePassword(password, data.password)) {
          throw { name: "Wrong Email/Password", status: '401' }
        } else if (data.role !== "admin") {
          throw { name: "Sorry admin only", status: '401' }
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
  static register(req, res, next) {
    const {email, password} = req.body

    User.create({email, password})
      .then(data => {
        res.status(201).json({id: data.id, email: data.email})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController