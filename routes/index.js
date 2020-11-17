const router = require("express").Router()
const UserController = require("../controllers/UserController")
const ProductController = require("../controllers/ProductController")
const BannerController = require("../controllers/BannerController")
const CategoryController = require("../controllers/CategoryController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.get("/", (req, res,) => {
  res.send("Success")
})

router.post("/register", UserController.register)
router.get("/products", ProductController.getProduct)
router.post("/login", UserController.login)
router.get("/banners", BannerController.getBanner)

router.use(authentication)
router.get("/products/:id", ProductController.getProductById)
router.post("/products", authorization, ProductController.addProduct)
router.put("/products/:id", authorization, ProductController.putProductById)
router.patch("/products/:id", authorization, ProductController.patchProductById)
router.delete("/products/:id", authorization, ProductController.deleteProductById)

router.get("/categories", CategoryController.getCategory)
router.post("/categories", authorization, CategoryController.addCategory)

router.post("/banners", authorization, BannerController.addBanner)
router.get("/banners/:id", authorization, BannerController.getBannerById)
router.put("/banners/:id", authorization, BannerController.putBannerById)
router.delete("/banners/:id", authorization, BannerController.deleteBannerById)


module.exports = router