const { Category } = require("../models")

class CategoryController {
  static addCategory(req, res, next){
    const { name } = req.body

    Category.create({ name })
      .then(data => {
        res.status(201).json({ name })
      })
      .catch(err => {
        next(err)
      })
  }

  static getCategory(req, res, next) {
    Category.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CategoryController