module.exports = (app) => {
    const gradeReview = require('../controllers/GradeReview.controller');

    // Create a new Note
    app.post('/gradeReview', gradeReview.create);
    //app.post('/gradeStudent/addAll', gradeStudent.createAll);

    //Get All gradeReview By class
    app.get('/gradeReview/:id', gradeReview.getAllByClass);

    //Get All gradeReview By idTeacher
    app.get('/gradeReview/:idTeacher/teacher', gradeReview.getReviewByTeacher);

    //Get All 
    app.get('/gradeReview', gradeReview.get);

    // Get grade review
    // //For teacher 
    app.get('/gradeReview', gradeReview.getByStudentIDClassId);

    // Teacher reponse

}