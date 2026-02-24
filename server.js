const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'toyinishola682@gmail.com',       // replace with your Gmail
        pass: 'xlcp sigb nclt xkpj',          // replace with your Gmail App Password
      },
    });

    let mailOptions = {
      from: email,
      to: 'toyinishola682@gmail.com',           // where you want to receive emails
      subject: `New message from ${name}`,
      text: message,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response); // <-- log success
    res.json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Nodemailer error:', error); // <-- log the real error
    res.status(500).json({ error: 'Error sending message.', details: error.toString() });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));