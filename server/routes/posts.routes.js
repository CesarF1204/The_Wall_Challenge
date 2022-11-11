const express = require('express');
const PostRoute = express.Router();
const PostsController = require('../controllers/posts.controller');

/* post */
PostRoute.post('/post_process', PostsController.postProcess)

module.exports = PostRoute;