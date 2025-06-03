const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        title: {type:String, maxLength: 100, trim: true, required:true},
        description: {type: String, maxLength: 500, trim: true},
        img: {type: String, required: true},
        categories: {type: String, enum: ["Finance", "Development", "Music", "Literature"], required: true}


},
{
    timestamps:true
}
);

const Course = mongoose.model('Course', courseSchema, 'courses');
module.exports = Course;
