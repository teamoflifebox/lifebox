const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // adjust path to your model

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_APP_PASSWORD
  }
});

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, token } = req.body;

  try {
    // Verify reCAPTCHA
    const recaptchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    if (!recaptchaRes.data.success) {
      return res.status(400).json({ message: 'reCAPTCHA failed' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, isVerified: false });
    await newUser.save();

    // Email Verification
    const emailToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const verificationUrl = `http://localhost:3000/verify-email?token=${emailToken}`;

    await transporter.sendMail({
      from: `"NoReply" <${process.env.MY_EMAIL}>`,
      to: email,
      subject: 'Verify Your Email',
      html: `<h4>Hello ${name},</h4><p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
    });

    res.status(201).json({ message: 'Registered. Please check your email to verify.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Email Verification Route
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.updateOne({ email: decoded.email }, { isVerified: true });
    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
