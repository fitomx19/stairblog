const mongoose = require('mongoose');

//variables de entorno
require('dotenv').config({path: 'variables.env'});
console.log(process.env.DB_URL);
console.log(process.env.DB_URL_ATLAS);

mongoose.connect(process.env.DB_URL_ATLAS, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB funcionando'))
    .catch(err => console.log(err));