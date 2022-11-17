const blogPostModel = require('../models/blogPostModel')


exports.deleteBlogPostById = async (req, res) => {
    try {
        await blogPostModel.deleteBlogPostById(req.params.id)
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}
exports.updateBlogPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const BlogPost = await blogPostModel.updateBlogPost(req.params.id, title, description);
        const updatedBlogPost = await blogPostModel.getBlogPostById(req.params.id)
        return res.status(200).json({
            success: true,
            updatedBlogPost
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}