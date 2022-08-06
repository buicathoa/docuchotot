const Joi = require('joi')

const multisubSchema = Joi.object().keys({
  title: Joi.string().required(),
  category_id: Joi.string().required(),
  subcategory_id: Joi.string().required(),
});

const subCategorySchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string(),
  category_id: Joi.string().required(),
});


// const postDetailsSchema = Joi.object().keys({
//   postID: Joi.string().required()
// })

// const postDeleteSchema = Joi.object().keys({
//   postID: Joi.string().required()
// })

// const getPostsSchema = Joi.object().keys({
//   currentPage: Joi.number().default(1),
//   pageSize: Joi.number().default(10)

// })

// const getPostsPagination = Joi.object().keys({
//   pageSize: Joi.number().default(10)
// });


// const loadLikeSchema = Joi.object().keys({
//   postID: Joi.string().required()
// });

module.exports = {
  multisubSchema,
  subCategorySchema
  // postDetailsSchema,
  // postDeleteSchema,
  // getPostsSchema,
  // getPostsPagination,
  // loadLikeSchema
};