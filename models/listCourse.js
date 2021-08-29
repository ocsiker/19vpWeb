const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ListCourseSchema = new Schema({
    name : String,
    author : String,
    Description : String,
    image : String,
    pdf : String
});

const ListCourse = mongoose.model('ListCourse', ListCourseSchema);

module.exports = ListCourse;
