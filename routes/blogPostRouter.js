const express = require('express');

const { updateBlogPost, deleteBlogPostById } = require('../controllers/blogPostController')
const blogPostRouter = express.Router();

blogPostRouter.put('/:id', updateBlogPost)
blogPostRouter.delete('/:id', deleteBlogPostById)

module.exports = blogPostRouter



