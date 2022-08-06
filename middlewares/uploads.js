const jwt_decode = require('jwt-decode');
const { ClientError } = require('../errors');
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmtomrfxk",
  api_key: "356589881238278",
  api_secret: "dQ9u8WziVAySNpuMdZv-cBxjMa0",
});
const uploads = (roles) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
    cloudinary.config({
      cloud_name: "dmtomrfxk",
      api_key: "356589881238278",
      api_secret: "dQ9u8WziVAySNpuMdZv-cBxjMa0",
    });
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "avatar",
      },
      use_filename: true,
    });
    multer({ storage: storage })
    // }

}
module.exports = uploads