const express = require('express');
const router = express.Router();
//obejto para crear rutas

const Post = require('../models/Posts');



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