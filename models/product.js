const mongoose = require("mongoose");
const User = require("./User");

const category = new mongoose.Schema({
  title: {
    require: true,
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
  param_url: {
    type: String,
    require: true,
  },
  sub_categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
  ],
});

const subCategory = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },
    param_url: {
      type: String,
      require: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      require: true,
    },
    // multiSubcategory: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "multiSubcategory",
    //   },
    // ],
  },
  { timestamps: true }
);

const brand = new mongoose.Schema(
  {
    brand_id:{
      require: true,
      type: String
    },
    title: {
      require: true,
      type: String,
    },
    category_id: {
      require: true,
      type: String,
    },
    subcategory_id: {
      require: true,
      type: String,
    },
    models: [
      {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "itemModel",
        require: true
      },
    ],
    param_url: {
        type: String,
        require: true
    }
  },
  { timestamps: true }
);

const itemModel = new mongoose.Schema(
  {
    model_id: {
      require:true,
      type: String
    },
    title: {
      require: true,
      type: String,
    },
    brand_id: {
      type: String,
      ref: "brand",
      require: true,
    },
    category_id: {
      require: true,
      type: String
    },
    subcategory_id: {
      require: true,
      type: String
    },
    param_url: {
        require: true,
        type: String
    }
  },
  { timestamps: true }
);

const userTest = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    require: true,
    type: String
  }
})

// module.exports = mongoose.model("District", districtSchema)
const categorySchema = mongoose.model("category", category);
const subCategorySchema = mongoose.model("subCategory", subCategory);
const brandSchema = mongoose.model(
  "brand",
  brand
);
const itemModelSchema = mongoose.model("itemModel", itemModel);
const userTestSchema = mongoose.model("userTest", userTest);
// const districtSchema = mongoose.model('district', district)
// const wardSchema = mongoose.model('ward', ward)

module.exports = {
  Category: categorySchema,
  subCategory: subCategorySchema,
  brand: brandSchema,
  itemModel: itemModelSchema,
  userTest: userTestSchema
};
