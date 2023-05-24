const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    //comment belongs to the user
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    post:{
        type : mongoose,
        ref : 'Post'
    }
},{timestamps : true
});

const Comment = mongoose.model('Comment',commentSchema)
modulde.exports = Comment;