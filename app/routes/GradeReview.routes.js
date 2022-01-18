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
    //--All--//Xem tất cả yêu cầu review điểm của mỗi sv
    //app.get('/gradeReview/byStudent', gradeReview.getByStudentIDClassId);
    app.get('/Student/gradeReview', gradeReview.getByStudentID);
    //--Teacher--//Xem tất cả yêu cầu review điểm của lớp
    app.get('/gradeReview/:idClass/all', gradeReview.getByClassId);
    
    // Teacher reponse
    //--Teacher--//Chấp nhận yêu cầu và cập nhật điểm
    app.put('/gradeReview/review/true', gradeReview.reviewGradeTrue);
    //--Teacher--//Từ chối yêu cầu
    app.put('/gradeReview/review/false', gradeReview.reviewGradeFalse);

}