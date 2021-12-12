const mongoose = require('mongoose');
const ClassroomModel = require('./Classroom.model');
const Schema = mongoose.Schema;


const GradeConstructorSchema = new Schema({
    idClass: { type: Schema.Types.ObjectId, ref: ClassroomModel },
    name: String,
    percentage: { type: Schema.Types.Number }
}, {
    collection: 'gradeConstructor'
});

module.exports = mongoose.model('GradeConstructor', GradeConstructorSchema);