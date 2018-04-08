require('../config/config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const mail = require('../middleware/mail');
const nodemailer = require('nodemailer');

const ContactFormSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
});

// ContactFormSchema.statics.sendContactFormMessage = function(args) {
// 	const { name, email, phone, message } = args;

// 	mail.send({
// 		name,
// 		email,
// 		phone,
// 		message
// 	});

// 	return args;
// }

ContactFormSchema.statics.sendContactFormMessage = function(args) {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${args.name} <${args.email}>`,
    to: 'Sean Hasenstein <seanhasenstein@gmail.com>',
    subject: `LSF Message from ${args.name}`,
    html: '<p>This will be filled in later...</p>',
    text: 'This will be filled in later...',
  };

  const sendMail = transport.sendMail(mailOptions);

  // return sendMail
  // 	.then((data) => console.log(data))
  // 	.catch((error) => console.log('There was an ERROR!!!!', error));

  return args;
};

mongoose.model('contactForm', ContactFormSchema);
