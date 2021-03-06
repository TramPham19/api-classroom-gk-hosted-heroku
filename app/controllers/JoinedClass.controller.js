const JoinedClass = require('../models/JoinedClass.model.js');
const UserController = require('../controllers/user.controller');
const User = require('../models/user.model.js');
const Classroom = require('../models/Classroom.model')

// Retrieve and return all Classroom from the database.
exports.findAllbyClassId = (req, res) => {
    JoinedClass.find({
        idClass: req.params.id,
        type: false
    })
        .populate("idClass")
        .populate("idUser")
        .then(joinedClass => {
            res.send(joinedClass);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Joined Class."
            });
        });
};
exports.findAllbyClassIdCoopTeach = (req, res) => {
    JoinedClass.find({
        idClass: req.params.id,
        type: true
    })
        .populate("idClass")
        .populate("idUser")
        .then(joinedClass => {
            res.send(joinedClass);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Joined Class."
            });
        });
};

exports.findClassJoinByMail = (req, res) => {
    console.log("findClassJoinByMailx")
    User.find({ email: req.params.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            console.log(user[0]._id)
            JoinedClass.find({
                idUser: user[0]._id
            })
                .populate("idClass")
                //.populate("idUser")
                .then(joinedClass => {
                    console.log(joinedClass)
                    let x = [];
                    for (var i = 0; i < joinedClass.length; i++) {
                        x.push(joinedClass[i].idClass);
                    }
                    console.log(x)

                    res.send(x);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving Joined Class."
                    });
                });
        })

};
exports.findClassCoTeachByMail = (req, res) => {
    User.find({ email: req.params.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            JoinedClass.find({
                idUser: user[0]._id,
                type: true
            })
                .populate("idClass")
                //.populate("idUser")
                .then(joinedClass => {
                    let x = [];
                    for (var i = 0; i < joinedClass.length; i++) {
                        x.push(joinedClass[i].idClass);
                    }
                    res.send(x);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving Joined Class."
                    });
                });
        })

};

exports.countAllStuInClass = (req, res) => {
    JoinedClass.find({
        idClass: req.params.id
    })
        //.populate("idClass")
        .populate("idUser")
        .countDocuments()
        .then(joinedClass => {
            res.send(
                { message: "" + joinedClass });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Joined Class."
            });
        });
};

exports.inviteTeacher = (req, res) => {
    // Validate request
    User.find({ email: req.body.email })
        .then(user => {
            console.log("user");
            console.log(user);
            if (!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.body.email
                });
            }
            else {
                JoinedClass.find({ idClass: req.params.id, idUser: user[0]._id })
                    .then(data => {
                        console.log("data");
                        console.log(data);
                        if (data.length !== 0) {
                            return res.status(404).send({
                                message: "User in class: " + data
                            });
                        }
                        else {
                            const joinedNew = new JoinedClass({
                                idClass: req.params.id,
                                idUser: user[0]._id,
                                type: true, //type true: teacher
                                hide: false
                            });
                            joinedNew.save()
                                .then(data => {
                                    res.send(data);
                                }).catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while creating the Classroom."
                                    });
                                });
                        }
                    })
            }
        })
};

exports.inviteStudent = (req, res) => {
    // Validate request
    User.find({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            else {
                JoinedClass.find({ idClass: req.params.id, idUser: user[0]._id })
                    .then(data => {
                        console.log("data");
                        console.log(data);
                        if (data.length !== 0) {
                            return res.status(404).send({
                                message: "User in class: " + data
                            });
                        }
                        else {
                            const joinedNew = new JoinedClass({
                                idClass: req.params.id,
                                idUser: user[0]._id,
                                type: false, //type false stu
                                hide: false
                            });
                            joinedNew.save()
                                .then(data => {
                                    res.send(data);
                                }).catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while creating the Classroom."
                                    });
                                });
                        }
                    })
            }
        })
};

exports.joinByCode = (req, res) => {
    // Ti??m ki????m s???? t????n ta??i cu??a l????p
    Classroom.find({
        _id: req.body.codeClass,
        owner: req.body.mailOwners
    })
        .then(classData => {
            console.log(classData)
            if (!classData) {
                return res.status(404).send({
                    success: false,
                    message: "Fail to find class "
                });
            }
            else {
                //Ki????m tra sv ??a?? join ch??a
                JoinedClass.find({ idClass: req.body.codeClass, idUser: req.body.idUser })
                    .then(data => {
                        // console.log("data");
                        // console.log(data);
                        if (data.length !== 0) {
                            return res.status(404).send({
                                success: false,
                                message: "User in class"
                            });
                        }
                        else {
                            const joinedNew = new JoinedClass({
                                idClass: req.body.codeClass,
                                idUser: req.body.idUser,
                                type: false, //type false stu
                                hide: false
                            });
                            joinedNew.save()
                                .then(data => {
                                    res.send({
                                        success: true,
                                        data
                                    });
                                }).catch(err => {
                                    res.status(500).send({
                                        success: false,
                                        message: err.message || "Some error occurred while joinning the Classroom."
                                    });
                                });
                        }
                    })
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: "Fail when find class."
            });
        });
};

exports.getPosition = (req, res) => {
    User.find({ email: req.params.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with email " + req.params.email
                });
            }

            Classroom.find({
                _id: req.params.id,
                owner: req.params.email
            })
                .then(data => {
                    console.log(data)
                    if (data.length > 0)
                        res.send({ message: "owner" });
                    else {
                        JoinedClass.find({
                            idUser: user[0]._id,
                            idClass: req.params.id,
                        })
                            .then(check => {
                                console.log(check[0].type)
                                if (check[0].type)
                                    res.send({ message: "coop" });
                                else
                                    res.send({ message: "student" });
                            }).catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while retrieving Joined Class."
                                });
                            });
                    }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving Joined Class."
                    });
                });
        })

};
