module.exports = (app) => {
    const gradeReview = require('../controllers/GradeReview.controller');

    // Create a new Note
    app.post('/gradeReview', gradeReview.create);

    // Get grade review
    // //For teacher 
    app.get('/gradeReview', gradeReview.getByStudentIDClassId);
    app.get('/gradeReview/:idClass/all', gradeReview.getByClassId);

    // Teacher reponse

}