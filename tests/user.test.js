const request = require('supertest');
const app = require('../app');
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { hashPassword } = require("../helpers/bcryptjs")

beforeAll((done) => {
  const data = [{
    email: "admin@email.com",
    password: hashPassword("12345678"),
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: "tes@email.com",
    password: hashPassword("12345678"),
    // role: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  }]
  queryInterface.bulkInsert("Users", data, {})
    .then(() => {
      done()
    })
    .catch(() => {
      done()
    })
})

describe("Test Endpoint POST /login", () => {
  it("Login succes", (done) => {
    request(app)
    .post("/login")
    .send({email: "admin@email.com", password: "12345678"})
    .then(response => {
      const {body, status} = response
      expect(status).toBe(200)
      expect(body).toHaveProperty("access_token")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Email/password is wrong", (done) => {
    request(app)
    .post("/login")
    .send({email: "admin@email.com", password: "123456789"})
    .then(response => {
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "Wrong Email/Password")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })

  it("Email/password cannot empty", (done) => {
    request(app)
    .post("/login")
    .send({email: "", password: ""})
    .then(response => {
      const {body, status} = response
      expect(status).toBe(401)
      expect(body).toHaveProperty("error", "Wrong Email/Password")

      done()
    })
    .catch(err => {
      done.fail(err)
    })
  })
})