const mongoose = require("mongoose");

const POSTS_PER_PAGE = 10;

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  writtenBy: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

blogPostSchema.statics.getAllBlogPosts = async function (title, page = 1) {
  const query = {};

  // Add a title filter that matches all substrings of the title
  // e.g geo would match geography, geology, NaGeo etc
  if (title) query.title = RegExp(`.*${title}.*`, "i");

  // Get all matching blog posts
  const blogPosts = await this.find(query)
    .skip(POSTS_PER_PAGE * (page - 1))
    .limit(POSTS_PER_PAGE);

  // Get total number of blog posts in db
  const totalBlogPosts = await this.find(query).countDocuments();

  return { blogPosts, totalBlogPosts };
};

module.exports = mongoose.model("blogpost", blogPostSchema);
