const nodemailer = require("nodemailer");
const Str = require('@supercharge/strings')
const random = Str.random() 
const User = require('../models/user.model')

exports.sendmailTeacher = (req, res) => {
    const email = req.body.email;
    const owner = req.body.owner;
    const classname = req.body.classname;
    const idclass = req.body.idclass;
    const link = "https://dagk-thclassroom-app.herokuapp.com/"+idclass+"/invite_teacher";
    console.log(link);

    const output = `
    <p>Hello,`+ email + `</p>
    <p> `+ owner + `, invited you to co-teach <b>"` + classname + `"</b></p>
    <button><a href="` + link + `">Join</a></button>
    <h3>If you accept, your contact information will be shared with the class members and applications they authorize to use Classroom.</h3>
    <h3>Forward to only those you trust. Anyone with this email may be able to accept the invitation.</h3>
  `;
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_ACCOUNT, // generated ethereal user
            pass: process.env.PASS_GMAIL, // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"TH CLASSROOM" <pghanit@example.com>', // sender address
        to: email, // list of receivers
        subject: "Invitation to co-teach", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

exports.sendmailStudent = (req, res) => {
    const email = req.body.email;
    const owner = req.body.owner;
    const classname = req.body.classname;
    const idclass = req.body.idclass;
    const link = "https://dagk-thclassroom-app.herokuapp.com/"+idclass+"/invite_student";
    console.log(link);

    const output = `
    <p>Hello,`+ email + `</p>
    <p> `+ owner + `, invited you to the class <b>"` + classname + `"</b></p>
    <button><a href="` + link + `">Join</a></button>
    <h3>If you accept, your contact information will be shared with the class members and applications they authorize to use Classroom.</h3>
    <h3>Forward to only those you trust. Anyone with this email may be able to accept the invitation.</h3>
  `;
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_ACCOUNT, // generated ethereal user
            pass: process.env.PASS_GMAIL, // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: `"TH CLASSROOM" <${process.env.GMAIL_ACCOUNT}>`, // sender address
        to: email, // list of receivers
        subject: "Invitation to co-teach", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

exports.sendmailActivation = (req, res) => {
    const email = req.body.email;
    const activation = req.body.activation;

    const output = `
    <p>Hello,`+ email + `</p>
    <p> <b> You have OTP to activation account </b></p>
    <h3>OTP: `+activation+`</h3>
    <h3>Please confirm to activation your account </h3>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_ACCOUNT, // generated ethereal user
            pass: process.env.PASS_GMAIL, // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: `"TH CLASSROOM" <${process.env.GMAIL_ACCOUNT}>`, // sender address
        to: email, // list of receivers
        subject: "Invitation to co-teach", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

exports.sendmailforget = (req, res) => {
    const email = req.body.email;

    const newpass = Str.random(10);
    const output = `
    <p>Hello,`+ email + `</p>
    <p> <b> You have new password </b></p>
    <h3>New password: `+ newpass +`</h3>
    <h3>Please confirm by login your account </h3>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_ACCOUNT, // generated ethereal user
            pass: process.env.PASS_GMAIL, // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: `"TH CLASSROOM" <${process.env.GMAIL_ACCOUNT}>`, // sender address
        to: email, // list of receivers
        subject: "Invitation to co-teach", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    //update pass
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user === null) {
                return res.status(400).send({
                    message: "User not found."
                });
            } else {
                user.setPasswordWithSalt(newpass, user.salt)
                User.findByIdAndUpdate(
                        user.id, {
                            password: user.password,
                        }, {
                            new: true
                        })
                    .then(users => {
                        console.log(users)
                        res.send(users)
                    })

            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Wrong Password"
            });
        });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};