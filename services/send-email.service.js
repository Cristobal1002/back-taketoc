require('dotenv').config();
const nodemailer = require('nodemailer');
const handlebars = require('handlebars')
const {promises} = require("fs");

const TEMPLATE_FOLDER =  process.cwd() + '/templates/';
const TEMPLATE = 'register-template.html'

const sendEmail = async(contact_email, register_link) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  // en este objeto se colocan todas las propiedades que se van a renderizar dinámicamente en la plantilla
  const data = {register_link}

  const templateData = await promises.readFile( TEMPLATE_FOLDER +  TEMPLATE, 'utf8');
  const rendered = renderTemplate(templateData, data)

   // send mail with defined transport object
   let info = await transporter.sendMail({
    from: '"Taketoc 👻" <notificaciones@taketoc.com>', // sender address
    to: contact_email, // list of receivers
    subject: "Invitación de acceso Taketoc platform ✔", // Subject line
    html:  rendered// "<b>Hello world?</b>", // html body
  });

   // console.log(info)

}

/**
 * Renderiza la plantilla con handlebars
 * @param template
 * @param data
 * @returns {string}
 */
function renderTemplate(template, data) {
    const render = handlebars.compile(template);
    return render(data);

}

module.exports = sendEmail