const express = require('express');
const router = express.Router();
//obejto para crear rutas

router.get('/', (req, res, next) => {
    res.render('index');
});
router.get('/about', (req, res, next) => {
    res.render('about');
});
router.get('/policiy', (req, res, next) => {
    res.render('pdf/CoinsPolitics');
});





module.exports = router;