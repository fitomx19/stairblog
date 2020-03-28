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



router.get('/posts/:page', async (req, res, next) => {
    let perPage = 3;
    let page = req.params.page || 1;


    /* const entradas = await Post.find().sort({ date: 'desc' });    
    res.render('posts/all-posts', { entradas }); */

    Post
        .find({}) // finding all documents
        .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
        .limit(perPage) // output just 9 items
        .sort({ date: 'desc' })
        .exec((err, entradas) => {
            Post.countDocuments((err, count) => { // count to calculate the number of pages
                if (err) return next(err);
                res.render('posts/all-posts', {
                    entradas,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        });
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



router.get("/posts/buscar", (req, res, next) => {

    const { title } = req.body;
    console.log(title);
    Post.fuzzySearch(title, function (err, entradas) {
        console.error(err);
        console.log(entradas);
        res.write(entradas);
      

    });


});




module.exports = router;