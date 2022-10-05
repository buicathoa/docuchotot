const mongoose = require("mongoose");
const product = require("./product");
const { Category, subCategory, multiSubcategory } = require("./product");
const User = require("./User");

const filterSchema = new mongoose.Schema(
  {
    keyEN: {
      require: true,
      type: String,
    },
    keyVI: {
      require: true,
      type: String
    },
    control_type: {
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
    droplist_value_option: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Filter", filterSchema);

