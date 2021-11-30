const GradeConstructor = require('../models/GradeConstructor.model.js');

// Create 
// exports.createAll = (reqq, res) => {
//     // Validate request
//     reqq.forEach(req => {
//         if (!req.body.name) {
//             return res.status(400).send({
//                 message: "Name content can not be empty"
//             });
//         }
//         if (!req.body.percentage) {
//             return res.status(400).send({
//                 message: "percentage content can not be empty"
//             });
//         }
//         if (!req.body.idClass) {
//             return res.status(400).send({
//                 message: "idClass content can not be empty"
//             });
//         }
    
//         // Create
//         const gradeConstructor = new GradeConstructor({
//             idClass: req.body.idClass,
//             name: req.body.name,
//             percentage: req.body.percentage
//         });
    
//         // Kiem tra phan Tram 
//         GradeConstructor.find({ idClass: req.body.idClass })
//             .then(data => {
//                 let tong = 0;
//                 for (let i = 0; i < data.length; i++) {
//                     tong = tong + data[i].percentage;
//                 }
//                 if (tong < 10) {
//                     console.log(tong)
//                     //Save
//                     gradeConstructor.save()
//                         .then(data => {
//                             res.send(data);
//                         }).catch(err => {
//                             res.status(500).send({
//                                 message: err.message || "Some error occurred while creating the Constructor."
//                             });
//                         });
//                 } else {
//                     res.send("Vuot qua 10");
//                 }
//             })
//     });
    
// };
exports.create = (req, res) => {
    // Validate request
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
    if (!req.body.idClass) {
        return res.status(400).send({
            message: "idClass content can not be empty"
        });
    }

    // Create
    const gradeConstructor = new GradeConstructor({
        idClass: req.body.idClass,
        name: req.body.name,
        percentage: req.body.percentage
    });

    // Kiem tra phan Tram 
    GradeConstructor.find({ idClass: req.body.idClass })
        .then(data => {
            let tong = 0;
            for (let i = 0; i < data.length; i++) {
                tong = tong + data[i].percentage;
            }
            if (tong < 10) {
                console.log(tong)
                //Save
                gradeConstructor.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Constructor."
                        });
                    });
            } else {
                res.send("Vuot qua 10");
            }
        })
};

// Find gradeConstructor of idClass
exports.findByClass = (req, res) => {
    GradeConstructor.find({ idClass: req.params.idClass })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Classroom not create gradeConstructor " + req.params.idClass
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Classroom not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Classroom with id " + req.params.id
            });
        });
};

exports.total = (req, res) => {
    GradeConstructor.find({ idClass: req.params.idClass })
        .then(data => {
            let tong = 0;
            for (let i = 0; i < data.length; i++) {
                tong = tong + data[i].percentage;
            }
            if (tong > 0) {
                res.send({
                    success: true,
                    message: "tong",
                    tong
                });
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred..."
            });
        });
};

// Update a Classroom identified by the id in the request
exports.update = (req, res) => {
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
                                res.send(data);
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

// Delete a Classroom with the specified id in the request
exports.delete = (req, res) => {
    GradeConstructor.findByIdAndRemove(req.params.id)
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
exports.deleteAll = (req, res) => {
    GradeConstructor.remove( {idClass: req.params.id } )
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
