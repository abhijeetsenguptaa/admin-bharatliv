const nodemailer = require('nodemailer');
const validator = require('validator');
const OtpGenerator = require('./OtpGenerator');

async function SendMailController(req, res) {
    try {
        const { email } = req.body;

        // Validate the email address format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        const OTP = OtpGenerator(6);
        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host:'wtmmedia.com',
            port:465,
            secure:true,
            auth: {
                user: '_mainaccount@wtmmedia.com',
                pass: '53rVP5cZO8xf!#' // Use the App Password generated from Google
            }
        });

        // Set up email data
        let mailOptions = {
            from: '"Kuber Gold Coins" <no-reply@wtmmedia.com>', // sender address
            to: email, // list of receivers
            subject: 'Email Verification', // Subject line
            text: 'Email Verification', // plain text body
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content p {
            font-size: 18px;
            margin-bottom: 30px;
        }
        .otp {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
            letter-spacing: 2px;
            padding: 10px 20px;
            border: 2px dashed #4CAF50;
            display: inline-block;
            margin-bottom: 30px;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for registering with us. Please use the following OTP to verify your email address:</p>
            <div class="otp">${OTP}</div>
            <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            &copy; 2024 Bajaj Overseas. All rights reserved.
        </div>
    </div>
</body>
</html>
` // html body
        };

        // Send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Failed to send email', error });
            }
            console.log('Message sent: %s', info.messageId);
            return res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId, otp: OTP });
        });
    } catch (error) {
        console.error('Error in SendMailController:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

module.exports = SendMailController;
