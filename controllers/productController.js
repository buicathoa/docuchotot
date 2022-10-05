// const fetch = require('node-fetch');
const express = require("express");
const axios = require("axios");
const jwt_decode = require("jwt-decode");
const { handleError, handleSuccess } = require("../utils/handleResponse");
const { to } = require("await-to-js");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const category = require("./../models/product");
const sharp = require("sharp");

const {
  Category,
  subCategory,
  brand,
  itemModel,
  userTest,
} = require("./../models/product");
const { removeVietnameseTones } = require("../helper");
const cloudinary = require("cloudinary").v2;

const productController = {
  createNewCategory: async (req, res) => {
    try {
      const isCategoryExists = await Category.findOne({
        title: req.body.title,
      });
      if (isCategoryExists) {
        return handleError(res, {
          code: 400,
          message: "this category name is exists",
        });
      }
      const stringUrl = removeVietnameseTones(req.body.title)
        .toLowerCase()
        .split(" ")
        .join("-");
      const file = req.file.path;
      const newPost = await new Category({
        title: req.body.title,
        image: file,
        param_url: `mua-ban-${stringUrl}`,
        // param_url: removeVietnameseTones(req.body.title)
      });
      await newPost.save();
      return handleSuccess(res, newPost, "Create new category successfully!");
    } catch (err) {
      return handleError(err);
    }
  },
  insertSubToCategory: async (req, res) => {
    try {
      const { list_sub, category_id } = req.body;
      const categoryFound = await Category.findById(category_id);
      const filterSubs = await list_sub.filter((item) => {
        return categoryFound._doc.sub_categories.indexOf(item) < 0;
      });
      const [err, result] = await to(
        Category.updateOne(
          { _id: category_id },
          {
            $set: {
              sub_categories: categoryFound.sub_categories.concat(filterSubs),
            },
          }
        )
      );
      if (err) {
        return handleError(res, err);
      }
      return handleSuccess(res, result, "Updated successfully!");
    } catch (err) {
      return handleError(err);
    }
  },
  createNewProductByCategory: async (req, res) => {
    try {
      const stringUrl = removeVietnameseTones(req.body.title)
        .toLowerCase()
        .split(" ")
        .join("-");
      const newSubCategory = await new subCategory({
        title: req.body.title,
        param_url: `mua-ban-${stringUrl}`,
        category_id: req.body.category_id,
      });
      await newSubCategory.save();
      return handleSuccess(
        res,
        newSubCategory,
        "Create new subCategory successfully!"
      );
    } catch (err) {
      return handleError(err);
    }
  },
  createNewBrand: async (req, res) => {
    try {
      const brand_id = await brand.count({});
      const newMultiSubcategory = await new brand({
        brand_id: brand_id + 1,
        title: req.body.title,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
        param_url: `bi${brand_id + 1}`,
      });
      await newMultiSubcategory.save();

      return handleSuccess(
        res,
        newMultiSubcategory,
        "Create new multiSubcategory successfully!"
      );
    } catch (err) {
      return handleError(err);
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const listCategories = await Category.find().populate("sub_categories");
      return handleSuccess(
        res,
        listCategories,
        "Get all categories successfully"
      );
    } catch (err) {
      return handleError(err);
    }
  },
  getAllSubCategory: async (req, res) => {
    try {
      const listCategories = await subCategory
        .find()
        .populate("multiSubcategory");
      return handleSuccess(
        res,
        listCategories,
        "Get all categories successfully"
      );
    } catch (err) {
      return handleError(err);
    }
  },
  getBrandsByMultisub: async (req, res) => {
    try {
      const { sub_id } = req.body;
      const listMultisubById = await brand.find({
        subcategory_id: sub_id,
      }).populate('models').exec();
      return handleSuccess(
        res,
        listMultisubById,
        "Get all categories successfully"
      );
    } catch (err) {
      return handleError(err);
    }
  },

  createModel: async (req, res) => {
    try {
      const modelCount = await itemModel.count({});
      const { title, brand_id, category_id, subcategory_id } = req.body;
      const newProduct = await new itemModel({
        model_id: modelCount + 1,
        title: title,
        brand_id: brand_id,
        category_id: category_id,
        subcategory_id: subcategory_id,
        param_url: `mi${modelCount + 1}`,
      });
      await newProduct.save();
      return handleSuccess(res, newProduct, "Create new product successfully!");
    } catch (err) {
      return handleError(err);
    }
  },
  insertModelToBrands: async (req, res) => {
    try {
      const { model_id, brand_id } = req.body;
      const brandFound = await brand.findOne({ brand_id: brand_id });
      const filterModels = await model_id.filter((item) => {
        return brandFound._doc.models.indexOf(item) < 0;
      });
      const [err, result] = await to(
        brand.updateOne(
          { brand_id: brand_id },
          {
            $set: {
              models: brandFound.models.concat(filterModels),
            },
          }
        )
      );
      if (err) {
        return handleError(res, err);
      }
      return handleSuccess(res, result, "Updated successfully!");
    } catch (err) {
      return handleError(err);
    }
  },
  getAllBrands: async (req, res) => {
    try {
      const listCategories = await brand.find().populate("models").exec();
      return handleSuccess(
        res,
        listCategories,
        "Get all multisubs successfully"
      );
    } catch (err) {
      return handleError(err);
    }
  },

  createAllItemFake: async (req, res) => {
    try {
      for (let i = 0; i < 1000000; i++) {
        const user = await new userTest({
          name: `${req.body.name + i}`,
        });
        await user.save();
      }
      return handleSuccess(res, "Create successfully");
    } catch (err) {
      return handleError(err);
    }
  },
  
  uploadImage: async (req, res) => {
    debugger
  }
};

module.exports = productController;
