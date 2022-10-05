const productController = require('./../controllers/productController')
const productMiddleware = require('../middlewares/product')
const {userLoginSchema} = require("../validationSchema/user.schema");
const userController = require('../controllers/userController');
const {uploadImage} = require('./../helper');
const { multisubSchema, subCategorySchema } = require('../validationSchema/product.schema.');
const { handleSuccess } = require('../utils/handleResponse');
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
//tạo brand - get sub theo id (Samsung, iphone)
router.post("/category/brand/create",productMiddleware(multisubSchema), productController.createNewBrand)
router.post("/category/brand/get-by-id", productController.getBrandsByMultisub)
router.post("/category/brand/get-all", productController.getAllBrands)
//tạo model
router.post("/category/model/create", productController.createModel)
router.post("/category/model/insert-models-to-brands", productController.insertModelToBrands)
//upload image
router.post("/upload/image", uploadImage('posts').single('specific_image'), async (req, res) => {
    return  res.status(200).json(req.file.path)
})

module.exports = router