const express = require('express');
const router = express.Router();
//obejto para crear rutas

const Post = require('../models/Comments');
const Answer  = require('../models/Answers');
const { isAuthenticated } = require('../handlers/auth');


router.post('/comment/new-comment', isAuthenticated, async (req, res) => {
    const { name, description , commentary ,id} = req.body;
    const k = 'posts/'+id; 
    const errors = [];
    if (!name) {
        errors.push({ text: 'Escribe tu nombre' });
    }
    if (!description) {
        errors.push({ text: 'Escriba un titulo' });
    }
    if (!commentary) {
        errors.push({ text: 'Escriba un comentario' });
    }
    if (errors.length > 0) {
        res.render( 'posts/all-posts', {
            errors,
            name,
            description,
            commentary,
            id

        });
        
    } else {
        //Instanciar la constante que en realdiad es una clase
        const newNote = new Post({ name, description, commentary, id });
        newNote.user = req.user.id; //el usuario
        console.log(newNote.user);
        await newNote.save();
        console.log(newNote);
        req.flash('success_msg', 'Comentario agregado correctamente');
        res.redirect('/posts');
        //node es asyncrono , save guarda
    }

});



router.post('/comment/new-answer', async (req, res) => {
    const { name, commentary, id_comentario } = req.body;
   
    const errors = [];
    if (!name) {
        errors.push({ text: 'Escribe tu nombre!' });
    }
    
    if (!commentary) {
        errors.push({ text: 'Escribe una respuesta!' });
    }
    if (errors.length > 0) {
        res.render('posts/all-posts', {
            errors,
            name,
            commentary,
            id

        });

    } else {
        //Instanciar la constante que en realdiad es una clase
        const newNote = new Answer({ name, commentary, id_comentario });
        newNote.user = req.user.id; //el usuario
        console.log(newNote.user);
        await newNote.save();
        console.log(newNote);
        req.flash('success_msg', 'Respuesta agregado correctamente');
        res.redirect('/posts');
        //node es asyncrono , save guarda
    }

});

module.exports = router;