const { Product } = require("../models")

class ProductController {
  static getProduct(req, res, next){
    Product.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static getProductById(req, res, next){
    Product.findAll({
      where: {
        id: +req.params.id
      },
      order: [["id", "ASC"]]
    })
    .then(data => {
      if (data.length === 0) {
        throw { name: "Product Not Found", status: 404 }
      } else {
        res.status(200).json(data)
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static addProduct(req, res, next){
    const { name, image_url, price, stock, CategoryId } = req.body

    Product.create({ name, image_url, price, stock, CategoryId })
      .then(data => {
        res.status(201).json({ name, image_url, price, stock, CategoryId })
      })
      .catch(err => {
        next(err)
      })
  }

  static putProductById(req, res, next) {
    const { name, image_url, price, stock } = req.body

    Product.update({ name, image_url, price, stock }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  static patchProductById(req, res, next) {
    const { CategoryId } = req.body

    Product.update({ CategoryId }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        if (data[0] === 0) {
          throw { name: "Product Not Found", status: 404 }
        } else {
          res.status(200).json(data[1][0])
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteProductById(req, res, next) {
    Product.destroy({ where: { id: req.params.id } })
      .then((data) => {
        if (!data) {
          throw { name: "Product Not Found", status: 404 }
        } else {
          res.status(201).json({ message: "Product success to delete" })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController