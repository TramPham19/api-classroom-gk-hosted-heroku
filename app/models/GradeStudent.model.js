const mongoose = require('mongoose');
const GradeConstructorModel = require('./GradeConstructor.model');
const UserModel = require('./user.model.js')
const Schema = mongoose.Schema;


const GradeStudentSchema = new Schema({
    idGrade:{type:Schema.Types.ObjectId, ref: GradeConstructorModel},
    StudentId: String,
    numberGrade: Number,
    status: Boolean,
},{
    collection: 'gradeStudent'
});

 module.exports = mongoose.model('GradeStudent', GradeStudentSchema);