const nodemailer = require('nodemailer');

let mailOptions = {
    from: 'ernestine.satterfield@ethereal.email',
    to: 'dewantororidho@gmail.com',
    subject: 'Happy Birthday! Here is your promo code',
    text: 'Some content to send',
};

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ernestine.satterfield@ethereal.email',
        pass: 'Ez6XfQpCHrnXSTyKpg'
    }
});

transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
});