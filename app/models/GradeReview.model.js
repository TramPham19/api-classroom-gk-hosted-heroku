const mongoose = require('mongoose');
const ClassroomModel = require('./Classroom.model');
const GradeStudent = require('./GradeStudent.model');
const GradeConstructorModel = require('./GradeConstructor.model');
const Schema = mongoose.Schema;


const GradeReviewSchema = new Schema({
    idGradeCon:{type:Schema.Types.ObjectId, ref: GradeConstructorModel},
    idClass:{type:Schema.Types.ObjectId, ref: ClassroomModel},
    StudentId: String,
    idTeacher: String,
    messStu: String,
    messTea: String,
    numberGradeOld: Number,
    numberGradeNew: Number,
    numberGradeNewTea: Number,
    status: Boolean, // Duyệt hay không duyệt 
    pending: Boolean, // Có đang đợi xử lý không 
    read: Boolean
},{
    collection: 'gradeReview',
    timestamps: true
});

 module.exports = mongoose.model('GradeReview', GradeReviewSchema);