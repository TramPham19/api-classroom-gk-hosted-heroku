const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassroomModel = require('./Classroom.model');

const StudentListSchema = new Schema({
    idClass: { type: Schema.Types.ObjectId, ref: ClassroomModel },
    StudentId: String,
    Fullname: String,
    numberGrade: Number

},{
    collection: 'StudentList',
    timestamps: true
    
});

 module.exports = mongoose.model('StudentList', StudentListSchema);