const GradeStudent = require('../models/GradeStudent.model');
const GradeConstructor = require('../models/GradeConstructor.model.js');
const GradeReviewModel = require('../models/GradeReview.model');

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

exports.findByClass = (req, res) => {
    GradeStudent.find()
        .populate("idGrade")
        .then(grade => {
            let t = []
            grade.forEach(element => {
                if (element.idGrade.idClass == req.params.ClassId) {
                    t.push(element)
                }
            });
            res.send({
                success: true,
                t
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
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

exports.findByGradeAndStudent = (req, res) => {
    GradeStudent.findOne({
        idGrade: req.body.idGrade,
        StudentId: req.body.StudentId
    })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Grade not exist " + req.body.idGrade
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Grade not found with id " + req.body.idGrade
                });
            }
            return res.status(500).send({
                message: "Error retrieving Graderoom with id " + req.body.idGrade
            });
        });
};

exports.findByGradeAndStudentParams = (req, res) => {
    GradeStudent.findOne({
        idGrade: req.params.idGrade,
        StudentId: req.params.StudentId
    })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Grade not exist " + req.body.idGrade
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Grade not found with id " + req.body.idGrade
                });
            }
            return res.status(500).send({
                message: "Error retrieving Graderoom with id " + req.body.idGrade
            });
        });
};

// exports.findByStudent = (req, res) => {
//     GradeStudent.find({StudentId: req.params.StudentId})
//         .then(data => {
//             let totalGrades = 0;
//             if (!data) {
//                 return res.status(404).send({
//                     message: "Grade not exist " + req.body.idGrade
//                 });
//             }

//             for(let i=0 ; i<data.length ; i++){
//                 GradeConstructor.findById(data[i].idGrade )
//                 .then(total=>{
//                     if (!total) {
//                         return res.status(404).send({
//                             message: "Grade not exist "
//                         });
//                     }
//                     totalGrades += data[i].numberGrade*total.percentage;
//                     res.
//             console.log(totalGrades)
//                 })
//             }
//             console.log(totalGrades)
//             res.send({
//                 success: true,
//                 totalGrades});
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Grade not found with id " + req.body.idGrade
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error retrieving Graderoom with id " + req.body.idGrade
//             });
//         });

// };

exports.findByStudent = (req, res) => {
    GradeStudent.find({ StudentId: req.params.StudentId })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Grade not exist " + req.body.idGrade
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Grade not found with id " + req.body.idGrade
                });
            }
            return res.status(500).send({
                message: "Error retrieving Graderoom with id " + req.body.idGrade
            });
        });
};

exports.update = (req, res) => {
    GradeStudent.findByIdAndUpdate(req.params.id, {
        idGrade: req.body.idGrade,
        StudentId: req.body.StudentId,
        numberGrade: req.body.numberGrade,
        status: req.body.status
    }, { new: true })
        .then(grade => {
            if (!grade) {
                return res.status(404).send({
                    message: "grade not found with id " + req.params.id
                });
            }
            res.send(grade);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "grade not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating grade with id " + req.params.id
            });
        });
};

exports.updateGrade = (req, res) => {
    GradeStudent.findOneAndUpdate({
        idGrade: req.body.idGrade,
        StudentId: req.body.StudentId
    }, {
        idGrade: req.body.idGrade,
        StudentId: req.body.StudentId,
        numberGrade: req.body.numberGrade,
        status: req.body.status
    },
        { new: true })
        .then(grade => {
            if (!grade) {
                return res.status(404).send({
                    message: "grade not found with id " + req.body.idGrade
                });
            }
            res.send(grade);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "grade not found with id " + req.body.idGrade
                });
            }
            return res.status(500).send({
                message: "Error updating grade with id " + req.body.idGrade
            });
        });
};

exports.delete = (req, res) => {
    GradeStudent.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Grade not found with id " + req.params.id
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


//ONLY STUDENT USE
exports.StudentViewGrade = (req, res) => {
    GradeStudent.findOne({
        idGrade: req.params.idGrade,
        StudentId: req.params.StudentId
    }).then(data => {
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Grade not exist"
            });
        } else {
            GradeConstructor.findOne({
                _id: req.params.idGrade,
                returnData: true
            }).then(d => {
                if (!d) {
                    return res.status(404).send({
                        success: false,
                        message: "Grade not return"
                    });
                }
                GradeReviewModel.find({
                    StudentId: req.params.StudentId,
                    idGradeCon: req.params.idGrade
                }).then(d1 => {

                    if (!d1) {
                        return res.send({
                            success: true,
                            successRview: false,
                            gradeData: data.numberGrade,
                        });
                    }
                    res.send({
                        success: true,
                        successRview: true,
                        gradeData: data.numberGrade,
                        messStu: d1[0].messStu,
                        messTea: d1[0].messTea,
                        pending: d1[0].pending,
                        status: d1[0].status
                    });
                }).catch(err => {
                    return res.send({
                        success: true,
                        successRview: false,
                        gradeData: data.numberGrade,
                    });
                });
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        success: false,
                        message: "Grade not exist"
                    });
                }
                return res.status(500).send({
                    success: false,
                    message: "Grade not exist"
                });
            });
        }
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Grade not exist"
            });
        }
        return res.status(500).send({
            success: false,
            message: "Grade not exist"
        });
    });
};