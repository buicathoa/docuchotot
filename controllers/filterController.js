const { Province, District, Ward } = require("./../models/location");
const express = require("express");
const axios = require("axios");
const jwt_decode = require("jwt-decode");
const { handleError, handleSuccess } = require("../utils/handleResponse");
const { to } = require("await-to-js");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const sharp = require("sharp");
const posts = require("../models/posts");
const filter = require("../models/filter")
const userController = require("./userController");
const User = require("../models/User");
const { Category } = require("../models/product");

const filterController = {
  createNewFilter: async (req, res) => {
    try {
      const { api_getdata, key, control_type, label, is_required, default_value, subCategory_id, droplist_value_option, width } = req.body;
      const newFilter = await new filter({
        api_getdata: api_getdata,
        key: key,
        control_type: control_type,
        label: label,
        is_required: is_required,
        subCategory_id: subCategory_id,
        default_value: default_value,
        droplist_value_option: droplist_value_option,
        width: width
      });
      await newFilter.save();
      return handleSuccess(res, newFilter, "Create new filters successfully!");
    } catch (err) {
      return handleError(err);
    }
  },
  getFilterById: async (req, res) => {
    try {
      const { subCategory_id } = req.body;
      const filterFounded = await filter.find({subCategory_id: subCategory_id})
      return handleSuccess(res, filterFounded, "Filter founded successfully! ");
    } catch (err) {
      return handleError(err);
    }
  },
};

module.exports = filterController;
