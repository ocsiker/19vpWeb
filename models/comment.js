const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ListUser',
        required : true
    },
    comment : {type : String, required : true}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
