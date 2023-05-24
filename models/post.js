const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,  //object id always unique of user
        ref : 'User'
    },
    //include the array of ids of all comments in this postschema itself
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,  //object id always unique of user
            ref : 'Comment' 
        }
    ]
},{
    timestamps : true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;