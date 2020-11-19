const router = require("express").Router()
const UserController = require("../controllers/UserController")
const ProductController = require("../controllers/ProductController")
const BannerController = require("../controllers/BannerController")
const CategoryController = require("../controllers/CategoryController")
const CartController = require("../controllers/CartController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const authCart = require("../middlewares/authCart")

router.get("/", (req, res,) => {
  res.send("Success")
})

router.post("/register", UserController.register)
router.get("/products", ProductController.getProduct)
router.post("/login", UserController.login)
router.get("/banners", BannerController.getBanner)
router.get("/categories", CategoryController.getCategory)
router.get("/banners/:id", authorization, BannerController.getBannerById)

router.use(authentication)
router.get("/products/cart", CartController.getCart)
router.get("/products/:id", ProductController.getProductById)
router.post("/products/:id", CartController.addCart)
router.patch("/products/cart/:id", authCart, CartController.updateAmount)
router.delete("/products/cart/:id",authCart, CartController.deleteCart)
router.post("/products", authorization, ProductController.addProduct)
router.put("/products/:id", authorization, ProductController.putProductById)
router.patch("/products/:id", authorization, ProductController.patchProductById)
router.delete("/products/:id", authorization, ProductController.deleteProductById)

router.post("/categories", authorization, CategoryController.addCategory)

router.post("/banners", authorization, BannerController.addBanner)
router.put("/banners/:id", authorization, BannerController.putBannerById)
router.delete("/banners/:id", authorization, BannerController.deleteBannerById)


module.exports = router