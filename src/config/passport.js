const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    // Busca el correo del usuario
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, { message: 'Usuario Encontrado' });
    } else {
        // Busca la contraseña del usuario
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña Incorrecta.' });
        }
    }

}));
//modulo instanciado

passport.serializeUser((user, done) => {
    done(null, user.id);
});
//toma un usuario y un callback

passport.deserializeUser((id, done) => {
    //toma el id de la sesion 
    //asi esta en la documentacion de passport con asyncono peta la fregadera

    User.findById(id, (err, user) => {
        done(err, user);
    });
});