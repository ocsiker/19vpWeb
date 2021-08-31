const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ListCourseSchema = new Schema({
    name : {type : String, required : true},
    course : String,
    Description : String,
    image : String,
    pdf : String,
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ListUser',
        required : true
    }
});

const ListCourse = mongoose.model('ListCourse', ListCourseSchema);

module.exports = ListCourse;
