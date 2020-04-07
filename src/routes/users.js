const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
var util = require("util");
//var mXm = require("musixmatch");

//mXm.Config.API_KEY = "afae3e5d00fa4fd2a8e0afe1ff3c2725";





//objeto para crear rutas
router.get('/users/signin', (req, res, next) => {
    res.render('./users/signin');
});

router.get('/secret/giphy', (req, res, next) => {
    res.render('./posts/giphy');
});
router.get('/secret/MusicxMatch', (req, res, next) => {
    var successCallback = function (modelOrCollection) {
        console.log("Success:");
        console.log("  " + util.inspect(modelOrCollection));
    };

    var errorCallback = function (response) {
        console.log("Error callback:");
        console.log("  " + util.inspect(response));
    };

    mXm.API.getTrack(TRACK_ID, successCallback, errorCallback);
    mXm.API.getLyrics(LYRICS_ID, successCallback, errorCallback);
    mXm.API.getArtist(ARTIST_ID, successCallback, errorCallback);
    mXm.API.getAlbum(ALBUM_ID, successCallback, errorCallback);
    mXm.API.getSubtitle(TRACK_ID, successCallback, errorCallback);
    mXm.API.searchTrack({ q: QUERY }, successCallback);
});


router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/posts/1',
    failureRedirect: '/users/signin',
    failureFlash: true
}));
//debemos introducur el nombre de autenticacion para que ejecute lo de config
//asi ya no hechamos tanto codigo

router.get('/users/signup', (req, res, next) => {
    res.render('./users/signup');
});

router.post('/users/signup', async (req, res) => {

    const { name, email, password, confirm_password , confirmacion } = req.body;
    const errors = [];
    if(confirmacion != 666){
        errors.push({ text: 'Porfavor inserta tu codigo de invitacion correctamente' });
    }
    if (name.length <= 0) {
        errors.push({ text: 'Porfavor inserta tu nombre' });
    }

    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Las constraseñas deben de ser de 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        // buscar el correo registrado
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'Ese email esta en uso.');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, email, password }); //crear objeto
            newUser.password = await newUser.encryptPassword(password); //propiedad password se reemplaza
            await newUser.save();//guardarlo
            console.log(newUser);
            req.flash('success_msg', 'Ya estas registrado!.');
            res.redirect('/users/signin');
        }
    }

});

router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Cerraste Sesion.');
    res.redirect('/users/signin');
});

module.exports = router;

