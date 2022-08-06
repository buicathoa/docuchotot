const productController = require('./../controllers/productController')
const productMiddleware = require('../middlewares/product')
const {userLoginSchema} = require("../validationSchema/user.schema");
const userController = require('../controllers/userController');
const {uploadImage} = require('./../helper');
const { multisubSchema, subCategorySchema } = require('../validationSchema/product.schema.');
const router = require("express").Router();

//category tạo, thêm sub vào category, get-all category (đồ điện tử, nhà đất)
router.post("/category/create", uploadImage('product').single("image"), async (req, res) => {
    productController.createNewCategory(req, res)
})
router.post("/category/get-all", productController.getAllCategories)
//tạo sub - điện thoại, laptop,...
router.post("/category/sub/create", productMiddleware(subCategorySchema), productController.createNewProductByCategory)
router.post("/category/sub/insert-sub-to-category", productController.insertSubToCategory)
router.post("/category/sub/get-all", productController.getAllSubCategory)
//tạo multi-sub - get sub theo id (Samsung, iphone)
router.post("/category/multi-sub/create",productMiddleware(multisubSchema), productController.createNewMultisubCategory)
router.post("/category/multi-sub/get-by-id", productController.getMultisubsById)
router.post("/category/multi-sub/get-all", productController.getAllMultisub)
//tạo product
router.post("/category/product/create", productController.createProduct)
router.post("/category/product/insert-to-multisub", productController.insertProductToMultisub)

router.post("/category/product/test", productController.createAllItemFake)
module.exports = router