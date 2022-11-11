const PostsModel = require('../models/posts.model');
const CommentsModel = require('../models/comments.model');

class UsersController {
    constructor(){
    }

    /* index */
    index = async function(req, res){
        let response_data = { status: false, error: null, message: ""};

        try{
            let fetch_posts = await PostsModel.fetchPosts();
            let fetch_comments = await CommentsModel.fetchComments();
            let user_id = req.session.user_id;

            response_data.result = {
                post_data: fetch_posts.result,
                comments_data: fetch_comments.result
            }

            res.render('../../views/dashboard/index', {fetchPosts: fetch_posts.result, fetchComments: fetch_comments.result, session_user_id: user_id});
        }
        catch(error){
            response_data.error = error;
        }
    }

}

module.exports = new UsersController;