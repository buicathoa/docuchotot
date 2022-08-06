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
const userController = require("./userController");
const User = require("../models/User");

const postController = {
  createNewPosts: async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        province_id,
        district_id,
        ward_id,
        seller_type,
        is_give_away,
        position,
        is_pinned,
        images,
        status,
        attribute,
        brand_id,
        category_id,
        subcategory_id,
        multisubcatgory_id,
        // brand_id,
        // status,
        // position,
        // is_pinned,
        // images,
        // attribute
      } = req.body;
      const listFiles = await req.files.map((item) => item.path).join(",");
      const newPost = await new posts({
        title: title,
        description: description,
        price: price,
        province_id: province_id,
        district_id: district_id,
        ward_id: ward_id,
        seller_type: seller_type,
        is_give_away: is_give_away,
        position: position,
        is_pinned: is_pinned,
        images: listFiles,
        status: status,
        attribute: attribute,
        brand_id: brand_id,
        category_id: category_id,
        subcategory_id: subcategory_id,
        multisubcategory_id: multisubcatgory_id
      });
      await newPost.save();
      return handleSuccess(res, newPost, "Create new posts successfully!");
    } catch (err) {
      return handleError(err);
    }
  },
  getPostsByUserId: async (req, res) => {
    try {
      const post = await posts.find({ seller: req.body.id }).populate("seller");
      const listPost = post.map((item) => {
        return {
          ...item._doc,
          seller: {
            username: item._doc.seller.username,
            email: item._doc.seller.email,
            address: item._doc.seller.address,
            firstname: item._doc.seller.firstname,
            lastname: item._doc.seller.lastname,
            image: item.image,
          },
        };
      });
      return handleSuccess(res, listPost, "Get list posts successfully");
    } catch (err) {
      return handleError(err);
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const post = await posts.find().populate("seller");
      const listPost = post.map((item) => {
        return {
          ...item._doc,
          seller: {
            username: item._doc.seller.username,
            email: item._doc.seller.email,
            address: item._doc.seller.address,
            firstname: item._doc.seller.firstname,
            lastname: item._doc.seller.lastname,
          },
        };
      });
      return handleSuccess(res, listPost, "Get list posts successfully");
    } catch (err) {
      return handleError(err);
    }
  },
};

module.exports = postController;
