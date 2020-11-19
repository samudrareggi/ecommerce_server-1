const {Product, Cart} = require("../models")

class CartController {
  static addCart(req, res, next) {
    const data = {
      UserId: req.loggedInUser.id,
      ProductId: req.params.id,
      amount: +req.body.amount
    }
    Cart.create(data)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getCart(req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.loggedInUser.id
      },
      include: [Product],
      order: [["id", "ASC"]]
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static updateAmount(req, res, next) {
    const {amount} = req.body
    Cart.update({amount}, {
      where: {
        ProductId: req.body.ProductId,
      },
      returning: true
    })
      .then(data => {
        console.log(data)
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
  static deleteCart(req, res, next) {
    Cart.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) {
        throw { name: "Cart Not Found", status: 404 }
      } else {
        res.status(201).json({ message: "Cart success to delete" })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController