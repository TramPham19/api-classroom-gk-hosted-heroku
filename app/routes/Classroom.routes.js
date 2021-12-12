
module.exports = (app) => {
    const classroom = require('../controllers/Classroom.controller.js');
    const verifyToken = require('../middleware/auth')
    // Create a new Note
    app.post('/classroom', verifyToken, classroom.create);

    // Retrieve all classroom
    //app.get('/classroom', classroom.findAll);

    // Retrieve all classroom create by user in verifyToken
    app.get('/classroom', verifyToken, classroom.find);

    //Find class room user create
    app.get('/classroom/:email', classroom.findcreate);

    // Retrieve a single Note with noteId
    app.get('/classroom/:id', classroom.findOne);

    // Update a Note with noteId
    app.put('/classroom/:id', classroom.update);

    // Delete a Note with noteId
    app.delete('/classroom/:id', classroom.delete);

}