const StudentList = require('../models/StudentList.model');

exports.findAll = (req, res) => {
    StudentList.find()
    .then(grade => {
        res.send(grade);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving list student."
        });
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.StudentId) {
        return res.status(400).send({
            message: "StudentId content can not be empty"
        });
    }
    if (!req.body.Fullname) {
        return res.status(400).send({
            message: "Fullname content can not be empty"
        });
    }
    if (!req.body.idClass) {
        return res.status(400).send({
            message: "idClass content can not be empty"
        });
    }

    // Create
    const student = new StudentList({
        idClass: req.body.idClass,
        StudentId: req.body.StudentId,
        Fullname: req.body.Fullname,
        numberGrade: req.body.numberGrade
    });

    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the list student."
        });
    });

};

exports.findByIdClass = (req, res) => {
    StudentList.find({ idClass: req.params.idClass })
        .then(StudentList => {
            if (!StudentList) {
                return res.status(404).send({
                    message: "StudentList not found with idClass " + req.params.idClass
                });
            }
            res.send(StudentList);
        }).catch(err => {
            if (err.kind === 'String') {
                return res.status(404).send({
                    message: "StudentList not found with idClass " + req.params.idClass
                });
            }
            return res.status(500).send({
                message: "Error retrieving StudentList with idClass " + req.params.idClass
            });
        });
};

exports.deleteAll = (req, res) => {
    StudentList.remove( {idClass: req.params.id } )
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Classroom not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    success: false,
                    message: "Classroom not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                success: false,
                message: "Could not delete Classroom with id " + req.params.id
            });
        });
};
