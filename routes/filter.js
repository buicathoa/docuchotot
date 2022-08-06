const filterController = require('./../controllers/filterController')
const validationMiddleware = require('../middlewares/validation')
const {userLoginSchema} = require("../validationSchema/user.schema");
const userController = require('../controllers/userController');
const { uploadImage } = require('../helper');

const router = require("express").Router();

router.post("/create", filterController.createNewFilter)
router.post("/get-by-id", filterController.getFilterById)
// router.post("/get-post-by-id", postController.getPostsByUserId)
// router.post("/get-all", postController.getAllPosts)

module.exports = router