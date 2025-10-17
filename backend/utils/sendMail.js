const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }

});

transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Mail server is ready to send email.")
    }
})


module.exports = transporter;  