const mongoose = require('mongoose');
const db = process.env.MONGODB_URL;
mongoose.connect( db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB funcionando'))
    .catch(err => console.log(err));