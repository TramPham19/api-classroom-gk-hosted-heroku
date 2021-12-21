module.exports = (app) => {
    const gradeStudent = require('../controllers/GradeStudent.controller');

    // Create a new Note
    app.post('/gradeStudent', gradeStudent.create);
    //app.post('/gradeStudent/addAll', gradeStudent.createAll);

    // // Retrieve all classroom
    app.get('/gradeStudent', gradeStudent.findAll);

    // // Find gradeStudent of idClass
    app.get('/gradeStudent/:idGrade', gradeStudent.findByGrade);
    // app.get('/gradeStudent/:idClass/total', gradeStudent.total);

    // Update gradeStudent by id
    //app.put('/gradeStudent/:id', gradeStudent.update);

    // Update gradeStudent public 
    //app.put('/gradeStudent/:id', gradeStudent.updateReturnAll);

    // // Delete gradeStudent by id
    // app.delete('/gradeStudent/:id', gradeStudent.delete);
    // app.delete('/gradeStudent/:id/deleteAll', gradeStudent.deleteAll);

}