const GradeStudent = require('../models/GradeStudent.model');

exports.findAll = (req, res) => {
    GradeStudent.find()
    .then(grade => {
        res.send(grade);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Grade of student."
        });
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.numberGrade) {
        return res.status(400).send({
            message: "Grade content can not be empty"
        });
    }
    if (!req.body.StudentId) {
        return res.status(400).send({
            message: "StudentId content can not be empty"
        });
    }
    if (!req.body.idGrade) {
        return res.status(400).send({
            message: "idGrade content can not be empty"
        });
    }

    // Create
    const gradeStudent = new GradeStudent({
        idGrade: req.body.idGrade,
        StudentId: req.body.StudentId,
        numberGrade: req.body.numberGrade,
        status: req.body.status
    });

    gradeStudent.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the grade of student."
        });
    });

};

// Find gradeConstructor of idClass
exports.findByGrade = (req, res) => {
    GradeStudent.find({ idGrade: req.params.idGrade })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Grade not exist " + req.params.idGrade
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Grade not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Graderoom with id " + req.params.id
            });
        });
};
