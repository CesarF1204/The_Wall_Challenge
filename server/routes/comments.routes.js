const express = require('express');
const CommentRoute = express.Router();
const CommentsController = require('../controllers/comments.controller');

/* add comment */
CommentRoute.post('/comment_process', CommentsController.commentProcess);

/* delete comment */
CommentRoute.post('/delete_comment', CommentsController.deleteComment);

/* edit comment */
CommentRoute.get('/edit_form/:comment_id', CommentsController.editCommentForm);
CommentRoute.post('/update_comment', CommentsController.updateCommentProcess);

module.exports = CommentRoute;