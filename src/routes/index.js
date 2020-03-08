const express = require('express');
const router = express.Router();
//obejto para crear rutas

const Post = require('../models/Posts');




router.get('/', async (req, res, next) => {
    const entradas = await Post.find().sort({ date: 'desc' });

    res.render('posts/all-posts', { entradas });
});

router.get('/about', (req, res, next) => {
    res.render('about');
});
router.get('/policiy', (req, res, next) => {
    res.sendFile(__dirname + "/public/" + "CoinsPolitics.pdf");
});





module.exports = router;