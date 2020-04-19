const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');
//obejto para crear rutas
var nodemailer = require('nodemailer'); 


require('dotenv').config({ path: 'variables.env' });



router.post('/send', (req, res) => {
    //console.log(req.body);
    const output = `
    <p>You have a new contact request</p>
    <h3>contact details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>email: ${req.body.email}</li>
    <li>asunto: ${req.body.asunto}</li>
 
    </ul>
        <p>mensaje: ${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
            user: process.env.USER_PSW,
            pass: process.env.PSW_PSW
        }
    });
    var mailOptions = {
        from: 'Michael Adolfo Huerta Ramirez',
        to: process.env.USER_PSW,
        subject: 'Asunto',
        text: 'Contenido del email',
        html: output
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
            res.render('about',{msg:'Se ha enviado correctamente el correo'});
        }
    });
});
//Aqui solo saldran los mejores post
router.get('/', async (req, res, next) => {
    const entradas = await Post.find()
    .sort({ date: 'desc' })
    .limit(1); // output just 9 items
    res.render('posts/all-post-index', { entradas });
});

router.get('/about', (req, res, next) => {
    res.render('about');
});





module.exports = router;