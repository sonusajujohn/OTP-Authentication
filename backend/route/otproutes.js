const express = require('express');
const router = express.Router();
const Otp = require('../model/otp'); 
const nodemailer = require('nodemailer');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to send OTP
router.post('/send', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiration

  try {
    // Save OTP to database
    await Otp.create({ email, otp, expiresAt });

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Dear User,\n\nYour OTP code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nYour App Team`,
    });

    res.json({ message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Error sending OTP' });
  }
});

// Route to verify OTP
router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (otpRecord && otpRecord.expiresAt > new Date()) {
      await Otp.deleteOne({ email }); 
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Error verifying OTP' });
  }
});

module.exports = router;
