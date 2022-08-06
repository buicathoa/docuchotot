const postController = require('./../controllers/postController')
const validationMiddleware = require('../middlewares/validation')
const {userLoginSchema} = require("../validationSchema/user.schema");
const userController = require('../controllers/userController');
const { uploadImage } = require('../helper');

const router = require("express").Router();

router.post("/create", uploadImage('posts').array("images"), async (req, res) => {
    postController.createNewPosts(req, res)
})
router.post("/get-post-by-id", postController.getPostsByUserId)
router.post("/get-all", postController.getAllPosts)

module.exports = router