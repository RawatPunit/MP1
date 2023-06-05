const Post = require('../models/post');

//export the publically avilable route files
module.exports.home =  async function (req,res){
    // return res.end('<h1> Express is up for codiel!</h1>') as this was sending a message to the browser 
    // it was just for checking purpose


    //display all the post
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title : "Codiel Home"
    //     });
    // });

    //display all the post and populate , means all the dateailsof the user is displayed too whose posts is there
    try{
        let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comments',
        populate:{
            path : 'user'
        }
    });
    let users = await User.find({});
    return res.render('home',{
        title : "Codiel Home",
        posts: posts,
        all_users : user
    });
    }catch(err){
        console.log('Error',err)
        return;
    }
    
}