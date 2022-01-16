const GradeStudent = require('../models/GradeStudent.model');
const GradeReview = require('../models/GradeReview.model');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.StudentId || !req.body.messStu ||
        !req.body.gradeNew || !req.body.gradeConId) {
        return res.status(400).send({
            success: false,
            message: "Content empty"
        });
    }

    // Create
    const gradeReview = new GradeReview({
        idGradeCon: req.body.gradeConId,
        StudentId: req.body.StudentId,
        numberGradeNew: req.body.gradeNew,
        numberGradeNewTea: null,
        status: false, //Chưa được sử lý
        pending: true, //Chờ
        messStu: req.body.messStu,
        messTea: null,
    });

    gradeReview.save()
        .then(data => {
            res.send({
                success: true,
                data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Fail."
            });
        });

};
exports.getByStudentIDClassId = (req, res) => {
    // Validate request
    if (!req.body.stuId || !req.body.idClass) {
        return res.status(400).send({
            success: false,
            message: "Content empty"
        });
    }

    GradeReview.find({
        StudentId: req.body.stuId
    })
    .populate("idGradeCon") 
    .then(data => {
        data.forEach(element => {
            if(element.idGradeCon.idClass === req.body.idClass){
                console.log(element)
            }
        });
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User."
        });
    });

};