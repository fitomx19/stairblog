const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Schema } = mongoose;
var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
//obejto para crear rutas

 const Post = require('../models/Posts'); 


const { isAuthenticated } = require('../handlers/auth');
//que en realdiad son helpers :v

router.get('/posts/add', isAuthenticated, (req, res) => {
    res.render('posts/new-post');
});

router.post("/posts/busqueda", (req, res, next) => {

    const { title } = req.body;
    console.log(title);
    Post.fuzzySearch(title, function (err, entradas) {
        console.error(err);
        console.log(entradas);
       
        res.render('posts/view', { entradas });

    });
   
});






router.get('/posts', async (req, res, next) => {
    const entradas = await Post.find().sort({ date: 'desc' });
            
    res.render('posts/all-posts', { entradas });
});

router.post('/post/new-post', async (req, res) => {
    const { title, description,image,content } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Escriba un titulo' });
    }
    if (!description) {
        errors.push({ text: 'Escriba una descripcion' });
    }
    if (errors.length > 0) {
        res.render('posts/new-post', {
            errors,
            title,
            description

        });
    } else {
        //Instanciar la constante que en realdiad es una clase
        const newPost = new Post({ title, description , image, content});
       // newNote.user = req.user.id; //el usuario
        await newPost.save();
        console.log(newPost);
        req.flash('success_msg', 'Post agregado correctamente');
        res.redirect('/posts');
        //node es asyncrono , save guarda
    }

});

router.get('/posts/:id', async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.render('posts/read', { post});
    
    
});

module.exports = router;