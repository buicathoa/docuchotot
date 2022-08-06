const mongoose = require("mongoose");
const product = require("./product");
const { Category, subCategory, multiSubcategory } = require("./product");
const User = require("./User");

const filterSchema = new mongoose.Schema(
  {
    api_getdata: {
      type: String,
    },
    key: {
      require: true,
      type: String,
    },
    control_type: {
      require: true,
      type: String,
    },
    label: {
      require: true,
      type: String,
    },
    is_required: {
      require: true,
      type: Boolean,
    },
    subCategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
    default_value: {
      type: String,
    },
    droplist_value_option: {
      type: String,
    },
    width: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("filter", filterSchema);
