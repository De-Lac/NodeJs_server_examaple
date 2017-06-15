// =======================
// IMPORT DIPENDENZE
// =======================
var express     = require('express');
var app         = express();

var bodyParser  = require('body-parser');// get POST parameteres
var morgan      = require('morgan');     // automatic log of HTTP requests
var Q           = require('q');          // Q promise
var mongoose    = require('mongoose');   // models for Mongo
// Use q. Note that you **must** use `require('q').Promise`.
mongoose.Promise = require('q').Promise;

var config = require('./config');        // get our config file




// =======================
// INIZIALIZZAZIONE SERVER E PACCHETTI 
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database



// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));  // dev = development



// =======================
// ROUTES BASIC
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Ciao! benvenuto nelle API GET del tutorial JWT su http://localhost:' + port); 
});

app.post('/', function(req, res) {
    res.send('Ciao! benvenuto nelle API POST del tutorial JWT su http://localhost:' + port);
});



// =======================
// ADMIN ROUTES 
// =======================
var adminRoutes = require('./routes/admin/admin-index');
app.use('/admin', adminRoutes);   // put /admin as prefix

 

// =======================
// API ROUTES 
// =======================
var apiRoutes = require('./routes/api/api-index');
app.use('/api', apiRoutes);   // put /admin as prefix




// =======================
// start the server ======
// =======================
app.listen(port);
console.log('server avviato su localhost:' + port);