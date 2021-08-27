const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ListCourseSchema = new Schema({
    name : String,
    ID : Number,
    Description : String,
    student : Number,
    image : String,
    pdf : String
});

const ListCourse = mongoose.model('ListCourse', ListCourseSchema);

module.exports = ListCourse;
