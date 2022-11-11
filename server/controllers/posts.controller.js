const PostsModel = require('../models/posts.model');
const GlobalHelper = require('../helpers/global.helper');

class PostsController {
    constructor(){
    }

    postProcess = async function(req, res){
        let response_data = { status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(["post"], [], req);

            if(validate_fields.status){
                let user_id = req.session.user_id;
                let {post} = validate_fields.result.sanitized_data;
                response_data = await PostsModel.insertNewPost({user_id, post});
            }
            else{
                response_data = validate_fields;
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    }



}

module.exports = new PostsController;