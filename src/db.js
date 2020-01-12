const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adolfo:kinect123@cluster0-dslfb.azure.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB funcionando'))
    .catch(err => console.log(err));