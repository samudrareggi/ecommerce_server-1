const { Product } = require("../models")

class ProductController {
  static getProduct(req, res, next){
    Product.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next()
    })
  }

  static addProduct(req, res, next){
    const { name, image_url, price, stock } = req.body

    Product.create({ name, image_url, price, stock })
      .then(data => {
        res.status(201).json({ name, image_url, price, stock })
      })
      .catch(err => {
        next(err)
      })
  }

  static putProductById(req, res, next) {
    const { name, image_url, price } = req.body

    Product.update({ name, image_url, price }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  static patchProductById(req, res, next) {
    const { stock } = req.body

    Product.update({ stock }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteProductById(req, res, next) {
    Product.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.status(201).json({ message: "Product success to delete" })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController