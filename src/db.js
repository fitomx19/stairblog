const mongoose = require('mongoose');

//variables de entorno
require('dotenv').config({path: 'variables.env'});


mongoose.connect(process.env.DB_URL_ATLAS, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB funcionando en la nube '))
    .catch(err => console.log(err));