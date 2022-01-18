const GradeStudent = require('../models/GradeStudent.model');
const GradeReview = require('../models/GradeReview.model');
const GradeConstructorModel = require('../models/GradeConstructor.model');
const Classroom = require('../models/Classroom.model.js');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.StudentId || !req.body.messStu ||
        !req.body.gradeOld || !req.body.gradeNew || !req.body.gradeConId) {
        return res.status(400).send({
            success: false,
            message: "Content empty"
        });
    }

    // Create
    const gradeReview = new GradeReview({
        idGradeCon: req.body.gradeConId,
        idClass: req.body.idClass,
        StudentId: req.body.StudentId,
        idTeacher: req.body.idTeacher,
        numberGradeOld: req.body.gradeOld,
        numberGradeNew: req.body.gradeNew,
        numberGradeNewTea: null,
        status: false, //Chưa được sử lý
        pending: true, //Chờ
        read: false,
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

exports.getAllByClass = (req, res) => {
    GradeReview.find({
        idClass: req.params.id
    })
        .then(review => {
            if (!review) {
                return res.status(404).send({
                    message: "Review not found with Grade contructor " + req.params.idGradeCon
                });
            }
            res.send(review);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Review not found with Grade contructor " + req.params.idGradeCon
                });
            }
            return res.status(500).send({
                message: "Error retrieving Review with Grade contructor " + req.params.idGradeCon
            });
        });
};

exports.getReviewByTeacher = (req, res) => {
    GradeReview.find({
        idTeacher: req.params.idTeacher
    })
        .then(review => {
            if (!review) {
                return res.status(404).send({
                    message: "Review not found with Grade contructor " + req.params.idGradeCon
                });
            }
            res.send(review);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Review not found with Grade contructor " + req.params.idGradeCon
                });
            }
            return res.status(500).send({
                message: "Error retrieving Review with Grade contructor " + req.params.idGradeCon
            });
        });
};

exports.get = (req, res) => {
    GradeReview.find()
        .then(review => {
            if (!review) {
                return res.status(404).send({
                    message: "Review not found with Grade contructor " + req.params.idGradeCon
                });
            }
            res.send(review);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Review not found with Grade contructor " + req.params.idGradeCon
                });
            }
            return res.status(500).send({
                message: "Error retrieving Review with Grade contructor " + req.params.idGradeCon
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
        StudentId: req.body.stuId,
        idGradeCon: req.body.idGradeCon
    })
        .then(data => {
            res.send({
                success: true,
                data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message + "Why" || "Some error occurred while retrieving User."
            });
        });

};

exports.getByClassId = (req, res) => {
    GradeReview.find().populate("idGradeCon")
        .then(data => {
            let t = []
            data.forEach(element => {
                if (element.idGradeCon != null) {
                    if (element.idGradeCon.idClass == req.params.idClass && element.pending)
                        t.push(element)
                }
            });
            res.send({
                success: true,
                data: t
            });
            //res.send(data);
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while retrieving User."
            });
        });
};

exports.reviewGradeTrue = (req, res) => {
    //Truyền vào idGR, messTea, newGrade, status => cập nhật được bảng GR
    //Truyền vào idGradeCon, StudentId, numberGrade => cập nhật điểm
    // {
    //     explanationMessage: null,
    //     NewGradeUpdate: null,
    //     idGradeReview: null,
    //      idGradeCon: null,
    //      StudentId: null
    // }
    if (!req.body.NewGradeUpdate || !req.body.idGradeCon
        || !req.body.idGradeReview || !req.body.StudentId) {
        return res.status(400).send({
            success: false,
            message: "Content empty"
        });
    }

    GradeReview.findByIdAndUpdate(req.body.idGradeReview, {
        messTea: req.body.explanationMessage,
        pending: false,
        status: true,
        numberGradeNewTea: req.body.NewGradeUpdate
    }, { new: true })
        .then(data => {
            GradeStudent.findOneAndUpdate({ idGrade: req.body.idGradeCon, StudentId: req.body.StudentId }, {
                numberGrade: req.body.NewGradeUpdate
            }, { new: true }).then(d => {
                res.send({
                    success: true,
                    data,
                    d
                });
            })
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred"
            });
        });
};

exports.reviewGradeFalse = (req, res) => {
    //Truyền vào idGR, messTea, newGrade, status => cập nhật được bảng GR
    //Truyền vào idGradeCon, StudentId, numberGrade => cập nhật điểm
    // {
    //     explanationMessage: null,
    //     idGradeReview: null,
    // }
    if (!req.body.idGradeReview) {
        return res.status(400).send({
            success: false,
            message: "Content empty"
        });
    }

    GradeReview.findByIdAndUpdate(req.body.idGradeReview, {
        messTea: req.body.explanationMessage,
        pending: false,
        status: false,
    }, { new: true })
        .then(data => {
            res.send({
                success: true,
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred"
            });
        });
};

exports.getByStudentID = (req, res) => {
    // Validate request
    if (!req.body.stuId || !req.body.idclass) {
        return res.status(400).send({
            success: false,
            message: "Content empty"
        });
    }

    GradeReview.find({
        StudentId: req.body.stuId,
        idClass: req.body.idclass
    })
        .then(data => {
            res.send({
                success: true,
                data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message + "Why" || "Some error occurred while retrieving User."
            });
        });

};