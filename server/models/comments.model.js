const DatabaseModel = require('./database/database.model');
const mysql = require('mysql');

class CommentsModel extends DatabaseModel {
    constructor(){
        super();
    }

    insertNewComment = async (params) => {
        let response_data = { status: false, result: {}, error: null}

        try{
            let {user_id, post_id, comment} = params;
            let comment_data = {
                post_id,
                user_id,
                comment,
                created_at: new Date()
            }

            let insert_user_comment_query = mysql.format(`INSERT INTO comments SET ?`, comment_data);
            let insert_user_comment_result = await this.query(insert_user_comment_query);

            response_data.result = {
                id: insert_user_comment_result.insertId,
                post_id,
                commented_user_id: user_id,
                comment
            };
            response_data.status = insert_user_comment_result.affectedRows > 0;
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to insert a new comment."
        }

        return response_data;
    }

    fetchComments = async () => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let fetch_comment_query = mysql.format(
                `SELECT JSON_OBJECTAGG(comments.id, JSON_OBJECT("comment_id", comments.id, "post_id", comments.post_id, "comment", comments.comment, "commented_user_id", comments.user_id, "commented_by", CONCAT(users.first_name, " ", users.last_name), "commented_at", comments.created_at)) as comments
                    FROM comments
                INNER JOIN users ON comments.user_id = users.id;`
            );
            let [fetch_comment_result] = await this.query(fetch_comment_query);

            response_data.result = JSON.parse(fetch_comment_result.comments);
            response_data.status = true;
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to fetch comment."
        }

        return response_data;
    }

    deleteComment = async (comment_id) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let delete_comment_query = mysql.format(`DELETE FROM comments WHERE id = ?;`, comment_id);

            let delete_comment_result = await this.query(delete_comment_query);

            response_data.result = delete_comment_result;
            response_data.status = true;
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to delete comment."
        }

        return response_data;
    }

    updateCommentProcess = async (params) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let {comment_id, edited_comment} = params;

            let update_comment_query = mysql.format(`UPDATE comments SET comment = ?, updated_at = NOW() WHERE id = ?;`, [edited_comment, comment_id]);

            let update_comment_result = await this.query(update_comment_query);

            response_data.result = update_comment_result;
            response_data.status = true;
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to update comment."
        }

        return response_data;
    }

}

module.exports = new CommentsModel;