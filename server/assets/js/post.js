$(document).ready(() => {

    /* post */
    $('#post').on('submit', function() {
        $.post($(this).attr('action'), $($(this)).serialize(), (data) => {
            if(data.status){
                $("#post_data").append(`<li>${data.result.post}
                                        <ul class="comment_data_${data.result.id}"></ul>
                                        </li>
                                            <form action="/comment_process" id="comment" method="post">
                                                <input type="hidden" name="post_id" value=${data.result.id}>
                                                <input type="text" name="comment" id="comment">

                                                <input type="submit" value="Comment">
                                            </form>
                                        `);
                $(".post").val('');
            }
            else{
                alert(data.message);
            }
        }, 'json');

        return false;
    });

});