module.exports = (app) => {
    const gradeStudent = require('../controllers/GradeStudent.controller');

    // Create a new Note
    app.post('/gradeStudent', gradeStudent.create);
    //app.post('/gradeStudent/addAll', gradeStudent.createAll);

    // // Retrieve all classroom
    app.get('/gradeStudent', gradeStudent.findAll);
    app.get('/gradeStudent/:ClassId', gradeStudent.findByClass);

    // // Find gradeStudent of idClass
    app.get('/gradeStudent/:idGrade/grade', gradeStudent.findByGrade);

    app.get('/gradeStudent/findGrade/find', gradeStudent.findByGradeAndStudent);
    app.get('/gradeStudent/findGrade/find/:idGrade/:StudentId', gradeStudent.findByGradeAndStudentParams);

    app.get('/gradeStudent/findGrade/byStudentId/:StudentId', gradeStudent.findByStudent);

    // // Update gradeStudent by Id
    app.put('/gradeStudent/:id', gradeStudent.update);

    // // Update gradeStudent by idGrade & StudentId
    app.put('/gradeStudent/updateGrade/find', gradeStudent.updateGrade);

    // // Delete gradeStudent by id
    app.delete('/gradeStudent/:id', gradeStudent.delete);
    // app.delete('/gradeStudent/:id/deleteAll', gradeStudent.deleteAll);

    //ONLY STUDENT USE
    app.get('/gradeStudent/viewGrade/:StudentId/:idGrade', gradeStudent.StudentViewGrade);

}