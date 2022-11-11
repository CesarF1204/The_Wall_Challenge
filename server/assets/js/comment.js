$(document).ready(() => {

    /* comment */
    $('.comment').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {
            if(data.status && data.result.commented_user_id === data.session_user_id){
                $(`.comment_data_${data.result.post_id}`).append(`<li>${data.result.comment}</li>
                                                                    <form action="/delete_comment" class="delete_comment" method="post">
                                                                        <input type="hidden" name="comment_id" value="${data.result.id}">
                                                                        <input type="submit" value="Delete">
                                                                    </form>
                                                                    <a href="/edit_form/${data.result.id}">Edit</a>`);
                $("#comment").val('');
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

    /* delete comment */
    $('.delete_comment').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {
            if(data.status){
                alert("Comment deleted!");
                location.reload();
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

    /* edit comment form */
    $('#edit_form').on('click', function() {
        return false;
    });

    /* edit comment */
    $('.edited_comment').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {
            if(data.status){
                window.location.href = '/dashboard';
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

});