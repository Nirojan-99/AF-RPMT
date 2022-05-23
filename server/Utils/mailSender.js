const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "project2020sliit@gmail.com",
    pass: "sliit2022",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.mailSender = (to, subject, text) => {
  //mailing details
  var mailOptions = {
    from: "project2020sliit@gmail.com",
    to: to,
    subject: subject,
    html: text,
  };

  //send mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      return true;
    }
  });
};
