const Joi = require("joi");
const blogPostModel = require("../models/blogPostModel");

const getBlogById = async (req, res) => {
  try {
    // title and page query parameters allow you to filter the blog post result
    const { title, page } = req.query;

    // Define validation Schema
    const schema = Joi.object({
      title: Joi.string(), // Only allow strings
      page: Joi.number().default(1).greater(0), // Only allow numbers greater than 0
    });

    // Validate User inputs
    const { error } = schema.validate({ title, page });

    if (error)
      return res.status(400).json({ success: false, error: error.message });

    // blogPosts is an object containing blogPosts and totalBlogPosts, hence the spread below
    const blogPosts = await blogPostModel.getAllBlogPosts(title, page);

    return res.status(200).json({ ...blogPosts, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getBlogById,
};
