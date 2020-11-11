const router = require("express").Router()
const UserController = require("../controllers/UserController")
const ProductController = require("../controllers/ProductController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.post("/login", UserController.login)
router.get("/products", ProductController.getProduct)

router.use(authentication)
router.post("/products", authorization, ProductController.addProduct)
router.put("/products/:id", authorization, ProductController.putProductById)
router.patch("/products/:id", authorization, ProductController.patchProductById)
router.delete("/products/:id", authorization, ProductController.deleteProductById)

module.exports = router