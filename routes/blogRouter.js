const router = require("express").Router();
const { getBlogById } = require("../controllers/blogPostController");

router.get("/", getBlogById);

module.exports = router;
