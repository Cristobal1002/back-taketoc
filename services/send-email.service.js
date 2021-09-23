require('dotenv').config();
const nodemailer = require('nodemailer');


const sendEmail = async(contact_email) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

   // send mail with defined transport object
   let info = await transporter.sendMail({
    from: '"Taketoc 👻" <notificaciones@taketoc.com>', // sender address
    to: contact_email, // list of receivers
    subject: "Invitación de acceso Taketoc platform ✔", // Subject line
    html: "<b>Hello world?</b>", // html body
  });

}

module.exports = sendEmail