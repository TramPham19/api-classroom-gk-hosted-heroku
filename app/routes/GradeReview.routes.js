module.exports = (app) => {
    const gradeReview = require('../controllers/GradeReview.controller');

    // Create a new Note
    app.post('/gradeReview', gradeReview.create);
    //app.post('/gradeStudent/addAll', gradeStudent.createAll);
}