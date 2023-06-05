const Comment = require('../models/comment');
const Post =  require('../models/post');
const commentMailer = require('../mailers/comments.mailer');
const queue = require('../config/kue');
const commentEmailerWorker = require('../workers/comment_email_worker')
module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user','name email').execPopulate();
            // commentsMailer.newComment(comment);
            let job = queueMicrotask.create('emails',comment).save(function(err){ //create a queue ,save function takes err and a callbaack
                if(err){
                    console.log('Error in creating a queue');
                    return;
                }
                console.log('job Enqueued one',job.id);
            })
            if(req.xhr){

                return res.status(200).json({
                    data :{
                        comment : comment
                    },
                    message : "Post Created"
                });
            }

            req.flash('Success','Comment Published');
            res.redirect('/');
        }
    }catch(err){
        req.flash('error',err)
    }
}    


























   