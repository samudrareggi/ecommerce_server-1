const request = require('supertest');
const app = require('../app');
const { User } = require("../models")
const { comparePassword } = require("../helpers/bcryptjs")
const { signToken } = require("../helpers/jwt")

let result = {}

beforeAll((done) => {
  User.findOne({
    where: {
      email: "admin@email.com"
    }
  })
    .then(data => {
      if (!data) {
        throw { name: "ErrorLogin" }
      } else if (!comparePassword("12345678", data.password)) {
        throw { name: "ErrorLogin" }
      } else {
        const access_token = signToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        result.access_token = access_token
        done()
      }
    })
    .catch(err => {
      done()
    })

    User.findOne({
      where: {
        email: "tes@email.com"
      }
    })
      .then(data => {
        if (!data) {
          throw { name: "ErrorLogin" }
        } else if (!comparePassword("12345678", data.password)) {
          throw { name: "ErrorLogin" }
        } else {
          const access_token = signToken({
            id: data.id,
            email: data.email,
            role: data.role
          })
          result.access_token_customer = access_token
          done()
        }
      })
      .catch(err => {
        done()
      })
})

describe("Test Endpoint POST /products", () => {
  it("Add product succes", (done) => {
    request(app)
    .post("/products")
    .send({name: "tes", image_url: "http", price: 10000, stock: 10})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(201)
      expect(body).toHaveProperty("name")
      expect(body).toHaveProperty("image_url")
      expect(body).toHaveProperty("price")
      expect(body).toHaveProperty("stock")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Token is null", (done) => {
    request(app)
    .post("/products")
    .send({name: "tes",image_url: "http", price: 10000, stock: 10})
    .then(response => {
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "Authentication Failed")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Role not admin", (done) => {
    request(app)
    .post("/products")
    .send({name: "tes",image_url: "http", price: 10000, stock: 10})
    .set("token", result.access_token_customer)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "Not Authorized")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Name is empty", (done) => {
    request(app)
    .post("/products")
    .send({name: "",image_url: "http", price: 10000, stock: 10})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Name cannot be empty")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Image url is null", (done) => {
    request(app)
    .post("/products")
    .send({name: "tes", price: 10000, stock: 10})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Product.image_url cannot be null")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Price is less than 1", (done) => {
    request(app)
    .post("/products")
    .send({name: "tes", image_url: "http", price: 0, stock: 10})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Please set price more than 0")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Stock is less than 0", (done) => {
    request(app)
    .post("/products")
    .send({name: "tes", image_url: "http", price: 10, stock: -10})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Please set stock more than or equal 0")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Price is filled in a string", (done) => {
    request(app)
    .post("/products")
    .send({name: "tes", image_url: "http", price: "tes", stock: 0})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Price is filled in a string")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Stock is filled in a string", (done) => {
    request(app)
    .post("/products")
    .send({name: "tes", image_url: "http", price: 10, stock: "tes"})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Stock is filled in a string")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })
})

describe("Test Endpoint PUT /product", () => {
  it("Update product succes", (done) => {
    request(app)
    .put("/products/10")
    .send({name: "tes", image_url: "http", price: 10000})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(200)
      expect(body).toHaveProperty("name")
      expect(body).toHaveProperty("image_url")
      expect(body).toHaveProperty("price")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Token is null", (done) => {
    request(app)
    .put("/products/10")
    .send({name: "tes",image_url: "http", price: 10000})
    .then(response => {
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "Authentication Failed")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Role not admin", (done) => {
    request(app)
    .patch("/products/10")
    .send({stock: 0})
    .set("token", result.access_token_customer)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "Not Authorized")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Stock is less than 0", (done) => {
    request(app)
    .patch("/products/10")
    .send({stock: -10})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Please set stock more than or equal 0")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Price is less than 1", (done) => {
    request(app)
    .put("/products/10")
    .send({name: "tes",image_url: "http", price: 0})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Please set price more than 0")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Stock is filled in a string", (done) => {
    request(app)
    .patch("/products/10")
    .send({stock: "tes"})
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(400)
      expect(body).toHaveProperty("error", "Stock is filled in a string")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })
})

describe("Test Endpoint DELETE /product", () => {
  it("Delete product succes", (done) => {
    request(app)
    .delete("/products/2")
    .set("token", result.access_token)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(201)
      expect(body).toHaveProperty("message", "Product success to delete")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Token is null", (done) => {
    request(app)
    .delete("/products/3")
    .then(response => {
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "Authentication Failed")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

    it("Role not admin", (done) => {
    request(app)
    .delete("/products/4")
    .set("token", result.access_token_customer)
    .then(response => {
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "Not Authorized")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })
})