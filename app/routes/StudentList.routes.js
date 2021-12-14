module.exports = (app) => {
    const StudentList = require('../controllers/StudentList.controller');

    // Create a new Note
    app.post('/StudentList', StudentList.create);

    // // Retrieve all classroom
    app.get('/StudentList', StudentList.findAll);

    //find student list in class
    app.get('/StudentList/:idClass', StudentList.findByIdClass);

    app.delete('/StudentList/:id/deleteAll', StudentList.deleteAll);
    
}