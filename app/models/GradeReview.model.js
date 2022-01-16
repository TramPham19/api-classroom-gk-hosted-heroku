const mongoose = require('mongoose');
const GradeStudent = require('./GradeStudent.model');
const GradeConstructorModel = require('./GradeConstructor.model');
const Schema = mongoose.Schema;


const GradeReviewSchema = new Schema({
    idGradeCon:{type:Schema.Types.ObjectId, ref: GradeConstructorModel},
    StudentId: String,
    messStu: String,
    messTea: String,
    numberGradeNew: Number,
    numberGradeNewTea: Number,
    status: Boolean, // Duyệt hay không duyệt 
    pending: Boolean // Có đang đợi xử lý không 
},{
    collection: 'gradeReview'
});

 module.exports = mongoose.model('GradeReview', GradeReviewSchema);