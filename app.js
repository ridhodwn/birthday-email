const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const { User } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        let user = await User.findAll();
        let length = 10;

        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };

        let mailOptions = {
            from: 'ernestine.satterfield@ethereal.email',
            to: user[0].email,
            subject: 'Happy Birthday! Here is your promo code ' + makeid(length),
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

        let today = new Date();
        
        cron.schedule('* * */24 * * *', () => {
            if(today.getDate() === user[0].birthDate.getDate() && today.getMonth() === user[0].birthDate.getMonth()) {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) console.log(error);
                    else console.log('Email sent: ' + info.response);
                });
            }
        });
    } catch(error) {
        if(error.name === "Not found") {
            res.status(404).json({message: "Not Found"});
        } else {
            res.status(500).json({message: "Internal server error"});
        }
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});