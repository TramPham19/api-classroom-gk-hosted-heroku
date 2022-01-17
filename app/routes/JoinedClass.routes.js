module.exports = (app) => {
    //const classroom = require('../controllers/Classroom.controller.js');
    const joinedClass = require('../controllers/JoinedClass.controller');

    // Find all user in classroom 
    app.get('/classroom/:id/alluser', joinedClass.findAllbyClassId);
    app.get('/classroom/:id/allteacher', joinedClass.findAllbyClassIdCoopTeach);
    app.get('/classroom/:id/alluserCount', joinedClass.countAllStuInClass);

    // Find position role in class
    app.get('/classroom/:id/:email/getPosition', joinedClass.getPosition)

    //Find all class usser join 
    app.get('/classroom/:email/joined', joinedClass.findClassJoinByMail);
    app.get('/classroom/:email/teached', joinedClass.findClassCoTeachByMail);

    //join class by link (:id : id class)
    app.post('/:id/invite_teacher', joinedClass.inviteTeacher);
    app.post('/:id/invite_student', joinedClass.inviteStudent);

    //Join class by code({codeClass, mailOwners, idUser})
    app.post('/joinByCode', joinedClass.joinByCode);


}