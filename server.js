require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)


// API endpoint to handle email sending
app.post('/send-email-sms', (req, res) => {
    const { name, browser, screenResolution, language, platform, userAgent, ipAddress } = req.body;

    const messageBody = `
        name : ${name}
        Browser: ${browser}
        Screen Resolution: ${screenResolution}
        Language: ${language}
        Platform: ${platform}
        User Agent: ${userAgent}
        IP Address: ${ipAddress}
    `;

    // Set up nodemailer with your email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: process.env.EMAIL_USER, // Replace with your email
            pass: process.env.EMAIL_PASS    // Replace with your email password or app-specific password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Replace with your email
        to: process.env.EMAIL_GATEWAY, // Replace with the phone number's email gateway
        subject: 'User Data Notification',
        text: messageBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
