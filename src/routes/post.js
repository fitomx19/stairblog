const express = require('express');
const router = express.Router();
//obejto para crear rutas

const Post = require('../models/Posts');
const Comentarios = require('../models/Comments');
const Answers = require('../models/Answers');

const { isAuthenticated } = require('../handlers/auth');
//que en realdiad son helpers :v

router.get('/posts/add', isAuthenticated, (req, res) => {
    res.render('posts/new-post');
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
    const commit = await Comentarios.find({ id: req.params.id }); 
  
    

    const rest = await Answers.find({ id_comentario: "5e2cfdcd8fffef156ced5c9d" }); 
  
    var comentario = ['1','2','22'];

 
    comentario.forEach(function (valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);
    });




    console.log(post);
    console.log('esto es el commit');
    console.log(commit);
    console.log('esto es el rest');
    console.log(rest);
    res.render('posts/read', { post, commit, rest });
});

router.post('/posts/search', async (req, res) => {
    const {word}  = req.body;
    
    const entradas = await Post.find({
        $or: [
            { title: word },
            { content: { $regex: word } },
            { description: word }
              
            
        ]
    });

    
    res.render('posts/all-posts', { entradas });
});
module.exports = router;