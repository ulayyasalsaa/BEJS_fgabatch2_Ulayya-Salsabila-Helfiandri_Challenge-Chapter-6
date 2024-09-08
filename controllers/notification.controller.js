const nodemailer = require('nodemailer');

const sendWelcomeNotification = async (userEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Welcome to Our Service',
    text: 'Thank you for signing up!',
  });
};

const sendPasswordChangeNotification = async (userEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Password Changed Successfully',
    text: 'Your password has been changed successfully!',
  });
};

module.exports = {
  sendWelcomeNotification,
  sendPasswordChangeNotification,
};
