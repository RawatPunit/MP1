const Post = require('../models/post');
const post = require('../models/comment');
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data :{
                    post : post 
                },
                message : 'Post is Created '
            })
        }
        req.flash('success','Post Published');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        // console.log('Error',err);
        return;
    }
    
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id)
        
        // ,function(err,post){
        // //checking authentication to delete & not lettign a situtaion where some1 else dels. some1 elsespost
        // //.id means converting the obj id into string 
        if(post.user == req.user.id){
            post.remove();
            
            await Comment.deleteMany({post :req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : "Post Deleted"
                })
            }

            req.flash('success','Post Deleted');
            return res.redirect('back')
        }else{
            req.flash('error','Post cant be Deleted');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        // console.log('Error',err);
        return res.redirect('back');
    }
    
}