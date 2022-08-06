const mongoose = require("mongoose");
const product = require("./product");
const { Category, subCategory, multiSubcategory } = require("./product");
const User = require("./User");

const postsSchema = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },
    description: {
      require: true,
      type: String,
    },
    price: {
      require: true,
      type: Number,
    },
    province_id: {
      require: true,
      type: String,
    },
    district_id: {
      require: true,
      type: String,
    },
    ward_id: {
      require: true,
      type: String,
    },
    seller_type: {
      require: true,
      type: String
    },
    is_give_away: {
      type: Boolean
    },
    position: {
      type: Number
    },
    is_pinned: {
      type: Boolean
    },
    status: {
      type: String,
      require: true
    },
    attribute: [
      {name: String, value: String}
    ],
    category_id:{
      require: true,
      type: String,
      ref: Category
    },
    subcategory_id: {
      require: true,
      type: String,
    },
    multisubcatgory_id: {
      require: true,
      type: String,
    },
    brand_id: {
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postsSchema);
