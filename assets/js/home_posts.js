{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault(); //not letting degfault fucnt. to perform --> i.e Default sbmit

            $.ajax({
                type: 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),  //coverts the form into JSON format
                success : function(data){
                    // console.log(data);
                    let newPost = newPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(newPost); //while add. new cmt it kick the earlier one to show new cmt.
                    deletePost($(' .delete-post-button',newPost))
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a  class="delete-post-button " href="/posts/destroy/<%= post.id %>"></a>
            </small>
      
            ${ post.content}
            <br>
            <small>
            ${post.user.name}
            </small>
        </p>
        <div class="post-comments">

                <form action="/comments/create" method = "POST">
                    <input type="text" name="content" placeholder="Type here to add comments..." required>
                    // {/* <!-- id of the post that comments need sto be aded --
                    <input type="hidden" name="post" value="${ post._id }" >
                    <input type="submit" value="Add Comment">
                
                </form>
            
            <%} %>
    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                    
                </ul>
            </div>
        </div> 
    </li>`)
    }

    //method to delet a Post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink.click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-$(data.data.post._id)`).remove();
                },error: function(error){
                    console.log(error.responseText)
                }
            })
        }))
    }




    createPost();
}