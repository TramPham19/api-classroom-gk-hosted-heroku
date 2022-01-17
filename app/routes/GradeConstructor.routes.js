module.exports = (app) => {
    const gradeConstructor = require('../controllers/GradeConstructor.controller.js');

    // Create a new Note
    app.post('/gradeConstructor', gradeConstructor.create);
    //app.post('/gradeConstructor/addAll', gradeConstructor.createAll);

    // // Retrieve all classroom
    // app.get('/gradeConstructor', gradeConstructor.findAll);

    // // Find gradeConstructor of idClass
    app.get('/gradeConstructor/byId/:id', gradeConstructor.findById);
    app.get('/gradeConstructor/:idClass', gradeConstructor.findByClass);
    //app.get('/gradeConstructor/:idClass/total', gradeConstructor.total);
    app.get('/gradeConstructor/find/:name', gradeConstructor.findByName);

    // Update gradeConstructor by id
    app.put('/gradeConstructor/:id', gradeConstructor.update);

    // Update return data 
    app.put('/gradeConstructor/:id/returnOne', gradeConstructor.updateReturnColumn);
    app.put('/gradeConstructor/:idClass/returnAll', gradeConstructor.updateReturnAll);
    // Update un return data 
    app.put('/gradeConstructor/:id/unreturnOne', gradeConstructor.updateUnReturnColumn);
    app.put('/gradeConstructor/:idClass/unreturnAll', gradeConstructor.updateUnReturnAll);

    // Delete gradeConstructor by id
    app.delete('/gradeConstructor/:id', gradeConstructor.delete);
    app.delete('/gradeConstructor/:id/deleteAll', gradeConstructor.deleteAll);

}