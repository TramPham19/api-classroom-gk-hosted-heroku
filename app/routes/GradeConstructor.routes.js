module.exports = (app) => {
    const gradeConstructor = require('../controllers/GradeConstructor.controller.js');

    // Create a new Note
    app.post('/gradeConstructor', gradeConstructor.create);

    // // Retrieve all classroom
    // app.get('/gradeConstructor', gradeConstructor.findAll);

    // // Find gradeConstructor of idClass
    app.get('/gradeConstructor/:idClass', gradeConstructor.findByClass);
    app.get('/gradeConstructor/:idClass/total', gradeConstructor.total);

    // Update gradeConstructor by id
    app.put('/gradeConstructor/:id', gradeConstructor.update);

    // Delete gradeConstructor by id
    app.delete('/gradeConstructor/:id', gradeConstructor.delete);

}