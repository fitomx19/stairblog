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
    const commits = await Comentarios.find({ id: req.params.id }); 
    
    const reply = await Comentarios.find({ reply: { $nin: [0] } })
        .where('id').equals(req.params.id);
    //Primer query de union tipo Joina
    /* const absolute = await Comentarios.aggregate([
        {
            $lookup:
            {
                from: 'Comentarios',
                localField: 'id_comentario',
                foreignField: 'id',
                as: 'Resultados'
            }
        }
    ]); */

    //iNTENTO NACIONAL DE PROGRSAR PARTE 1
    
   
    //console.log(reply); 
   var matriz = [];
   var arreglo = [];
    //AHORA TENEMOS QUE ALMACENAS ESTA MADRE E.E
   for (var i = 0; i < reply.length; i++) {
  
      arreglo = reply[i]["_id"]; 
      matriz = reply[i]["reply"];
       /* const consulta_arreglo = await Comentarios.find()
           .where('id').equals(arreglo);
       for (let j = 0; j < consulta_arreglo.length; j++) {
           
           matriz.push(consulta_arreglo[j]);
           
       }
       var seleccion = matriz.name;

             */
       console.log(matriz);
   }
    
    
    


  

    //primero necesitamos recuperar bien las consultas y luego 
    //las impimire en arrayas posterior a esto los imprimire de forma adecuada uwu
    //console.log('This is a thest' + reply);
   



   /*  var arr = [];
    var Comentario = [];
    var Respuesta = [];
    for (var i = 0; i < Comentario.length; i++) {
        arr.push({
            comment: commits[i],
            answer: reply[i]
        });
    }
 */
   // console.log("isi", arr)
  
   
 
    //console.log(post);
    //console.log('esto es el commit');
         // console.log(commits);
    //console.log('esto es el rest');
    //console.log(rest);
    res.render('posts/read', { post, commits});
  

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