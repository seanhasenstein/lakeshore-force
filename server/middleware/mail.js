require('../config/config');

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.send = options => {
  const mailOptions = {
    from: `${options.name} <${options.email}>`,
    to: 'Sean Hasenstein <seanhasenstein@gmail.com>',
    subject: `LSF Message from ${options.name}`,
    html: '<p>This will be filled in later...</p>',
    text: 'This will be filled in later...',
  };

  const sendMail = transport.sendMail(mailOptions);

  sendMail.then(data => console.log(data)).catch(error => console.log('There was an ERROR!!!!', error));
};
