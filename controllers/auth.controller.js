const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('@prisma/client').PrismaClient();

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.json({
      status: 'error',
      message: 'User not found',
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const resetLink = `http://yourapp.com/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });

  res.json({
    status: 'success',
    message: 'Password reset link sent to your email',
  });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = bcrypt.hashSync(newPassword, 8);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    res.json({
      status: 'success',
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Failed to reset password',
    });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
  
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({
      status: 'success',
      message: 'Login successful',
      token,
    });
  };
  

module.exports = {
  forgotPassword,
  resetPassword,
  login
};
