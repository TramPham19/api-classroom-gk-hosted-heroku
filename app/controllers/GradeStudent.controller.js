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

// Update a Classroom identified by the id in the request
exports.updateReturnAll = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name content can not be empty"
        });
    }
    if (!req.body.percentage) {
        return res.status(400).send({
            message: "percentage content can not be empty"
        });
    }
    //Kiem tra
    GradeConstructor.findById(req.params.id)
        .then(data => {
            //console.log(data)
            GradeConstructor.find({ idClass: data.idClass })
                .then(data => {
                    console.log(data)
                    let tong = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._id != req.params.id) {
                            tong = tong + data[i].percentage;
                        }
                    }
                    tong = tong + Number(req.body.percentage)
                    console.log(tong)

                    if (tong <= 10) {
                        GradeConstructor.findByIdAndUpdate(req.params.id, {
                            name: req.body.name,
                            percentage: req.body.percentage
                        }, { new: true })
                            .then(data => {
                                if (!data) {
                                    return res.status(404).send({
                                        message: "Classroom not found with id " + req.params.id
                                    });
                                }
                                res.send({
                                    success: true,
                                    data});
                            }).catch(err => {
                                if (err.kind === 'ObjectId') {
                                    return res.status(404).send({
                                        message: "Classroom not found with id " + req.params.id
                                    });
                                }
                                return res.status(500).send({
                                    message: "Error updating Classroom with id " + req.params.id
                                });
                            });
                    }
                    else {
                        res.send({
                            success: false,
                            message: "vuot qua 10"
                        });
                    }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred..."
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred..."
            });
        });
    // Find Classroom and update it with the request body
};
