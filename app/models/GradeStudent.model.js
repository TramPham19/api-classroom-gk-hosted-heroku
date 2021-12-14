const mongoose = require('mongoose');
const GradeConstructorModel = require('./GradeConstructor.model');
const UserModel = require('./user.model.js')
const Schema = mongoose.Schema;


const GradeStudentSchema = new Schema({
    idGrade:{type:Schema.Types.ObjectId, ref: GradeConstructorModel},
    idUser:{type:Schema.Types.ObjectId, ref: UserModel},
    numberGrade: Number

},{
    collection: 'gradeStudent'
});

 module.exports = mongoose.model('GradeStudent', GradeStudentSchema);