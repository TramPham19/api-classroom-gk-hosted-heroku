const GradeConstructor = require('../models/GradeConstructor.model.js');

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
        percentage: req.body.percentage,
        returnData: false
    });

    // Kiem tra phan Tram 
    GradeConstructor.find({ idClass: req.body.idClass })
        .then(data => {
                //Save
                gradeConstructor.save()
                    .then(data => {
                        res.send({
                            success: true,
                            data
                        });
                    }).catch(err => {
                        res.status(500).send({
                            success: false,
                            message: err.message || "Some error occurred while creating the Constructor."
                        });
                    });
            
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


exports.findByReturnData = (req, res) => {
    GradeConstructor.find({ returnData: req.params.returnData })
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
exports.findById = (req, res) => {
    GradeConstructor.findById(req.params.id )
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Grade not create gradeConstructor " + req.params.id
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
                message: "Error retrieving Grade with id " + req.params.id
            });
        });
};

exports.findByName = (req, res) => {
    GradeConstructor.find({ name: req.params.name })
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
                                    data
                                });
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
// Update a GradeConstructor identified by the id in the request
exports.updateReturnColumn = (req, res) => {
    GradeConstructor.findByIdAndUpdate(req.params.id, {
        returnData: true
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Classroom not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data
            });
        }).catch(err => {
            return res.status(500).send({
                success: false,
                message: "upload fail"
            });
        });
};
// Update a Classroom identified by the id in the request
exports.updateReturnAll = (req, res) => {
    GradeConstructor.updateMany({ "idClass": req.params.idClass }, { "$set": { "returnData": true } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Classroom not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data
            });
        }).catch(err => {
            return res.status(500).send({
                success: false,
                message: "upload fail"
            });
        });
};

// Update a GradeConstructor identified by the id in the request
exports.updateUnReturnColumn = (req, res) => {
    GradeConstructor.findByIdAndUpdate(req.params.id, {
        returnData: false
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Classroom not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data
            });
        }).catch(err => {
            return res.status(500).send({
                success: false,
                message: "upload fail"
            });
        });
};
// Update a Classroom identified by the id in the request
exports.updateUnReturnAll = (req, res) => {
    GradeConstructor.updateMany({ "idClass": req.params.idClass }, { "$set": { "returnData": false } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Classroom not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data
            });
        }).catch(err => {
            return res.status(500).send({
                success: false,
                message: "upload fail"
            });
        });
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
    GradeConstructor.remove({ idClass: req.params.id })
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
