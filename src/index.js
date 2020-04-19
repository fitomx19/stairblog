const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var bodyParser = require('body-parser');
//Inicializaodres
const app = express();
 require('./db');
 require('./config/passport');  
//CONFIGURACIONES

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT  || 3000;

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', 'hbs');



app.set('view engine', '.hbs');
//Middlewares funciones antes de que lleguen alas rutas o servidor
app.use(express.urlencoded({ extended: false }));//solo quiero sus datos


app.use(methodOverride('_method')); //para usar put && delete

//pasports
app.use(session({
    secret: 'shisho666',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

//Variables Globales

 app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; 
    //asi lo pide passport
    next();
}); 

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/post'));
app.use(require('./routes/users'));
app.use(require('./routes/comments'));

app.post('/send', (req,res)=>{
    console.log(req.body);
})
//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
// Sere esta escuchando
app.listen(port,host, () => {
    console.log('Servidor en puerto', port);
});

/* 
 npm i -D handlebars@4.5.0 SOLCUCION PARA EL CHILD HANDLEBARS */

/* heroku login
$ heroku git: clone - a blogwave
$ cd blogwave
$ git add .
$ git commit -am "please workds"
$ git push heroku master */