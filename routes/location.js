const locationController = require('./../controllers/locationController')
const validationMiddleware = require('../middlewares/validation')
const {userLoginSchema} = require("../validationSchema/user.schema")
const router = require("express").Router();

router.post("/create", locationController.createProvince)
router.post("/district/create", locationController.createDistrict)
router.post("/ward/create", locationController.createWards)

router.post("/insert-district-to-province", locationController.insertDistrictToProvince)
router.post("/get-all", locationController.getAllProvince)
router.post("/district", locationController.getDistrictByProvinceId)
router.post("/ward", locationController.getWardsByDistrictsId)
module.exports = router