const DatabaseModel = require('./database/database.model');
const mysql = require('mysql');

class PostsModel extends DatabaseModel {
    constructor(){
        super();
    }

    insertNewPost = async (params) => {
        let response_data = { status: false, result: {}, error: null}

        try{
            let {user_id, post} = params;

            let post_data = {
                user_id,
                post,
                created_at: new Date()
            }

            let insert_user_post_query = mysql.format(`INSERT INTO posts SET ?`, post_data);
            let insert_user_post_result = await this.query(insert_user_post_query);

            response_data.result = {
                id: insert_user_post_result.insertId,
                post
            };
            response_data.status = insert_user_post_result.affectedRows > 0;
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to insert a new post."
        }

        return response_data;
    }

    fetchPosts = async () => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let fetch_post_query = mysql.format(
                `SELECT JSON_OBJECTAGG(posts.id,JSON_OBJECT("post_id", posts.id, "post", posts.post, "posted_by", CONCAT(users.first_name, " ", users.last_name), "posted_at", DATE_FORMAT(posts.created_at, '%M %D %Y - %h:%m %p'))) as posts
                    FROM posts
                INNER JOIN users ON users.id = posts.user_id;`
            );
            let [fetch_post_result] = await this.query(fetch_post_query);

            response_data.result = JSON.parse(fetch_post_result.posts);
            response_data.status = true;
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to fetch post."
        }

        return response_data;
    }

}

module.exports = new PostsModel;