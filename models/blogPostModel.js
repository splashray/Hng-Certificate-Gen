const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');


const blogPostSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4().replace(/\-/g, "")
  },
  title: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  writtenBy: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    
  }

})

blogPostSchema.statics.addBlogPost = async function (title,
  article, writtenBy, datePosted) {
  try {
    const blogPost = await this.create({ title, article, writtenBy, datePosted })
    return blogPost
  } catch (error) {
    throw error
  }
}

blogPostSchema.statics.getAllBlogPosts = async function () {
  try {
    const blogPosts = await this.find({}, { '_id': 0, '__v': 0 })
    return blogPosts
  } catch (error) {
    throw error
  }
}

blogPostSchema.statics.getOneBlogPost = async function (id) {
  try {
    const blogPost = await this.findOne({ _id: id }, { '_id': 0, '__v': 0 })
    if (!blogPost) {
      throw new Error('No blogPost with this id found')
    }
    return blogPost
  } catch (error) {
    throw error
  }
}

blogPostSchema.statics.deleteBlogPostById = async function (id) {
  try {
    const blogPostExists = await this.findOne({ _id: id })
    if (!blogPostExists) {
      throw new Error('No blogPost with this id found')
    }
    const result = await this.deleteOne({ _id: id })
    return result
  } catch (error) {
    throw error;
  }
}

blogPostSchema.statics.updateBlogPost = async function (id, title,
  article,) {
  try {
    const blogPostExists = await this.findOne({ _id: id })
    if (!blogPostExists) {
      throw new Error('No blogPost with this id found')
    }
    const blogPost = await this.updateOne({ _id: id }, { title, article })
    return blogPost
  } catch (error) {
    throw error
  }
}



module.exports = mongoose.model('blogPost', blogPostSchema)