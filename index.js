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
// SETUP GLOBAL LOGGER
// =======================
var winston     = require('winston');
var fs          = require('fs');

// create the log directory if it does not exist
if (!fs.existsSync(config['log-dir'])) 
   {  fs.mkdirSync(config['log-dir']); }

var tsFormat = () => (new Date()).toLocaleDateString();
global.logger = new (winston.Logger)({
    transports:[
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: config['ambiente-log']   
            /* qui setto il livello di debug da usare tra
               { error:0, warn:1, info:2, verbose:3, debug:4, silly:5 }
               il più alto comprende anche i più bassi. Esempio:
               se scelgo 'info', i log 'debug' verranno ignorati
            */
        }),
        new (winston.transports.File)({
            filename: `${config['log-dir']}/errors.log`,
            timestamp: tsFormat,
            level: 'error'
            /* solo per quanto riguarda gli errori,
               oltre a scriverli sulla console
               li salvo in un file errors.log
            */
        })
    ]
});




// =======================
// INIZIALIZZAZIONE SERVER E PACCHETTI 
// =======================



/*
  if I make requests from a different domain of the server, I have to grant the access to that specific domain.
  Example.  I have deployed my server on http://myserver1.it
  But I send requests from http://myserver2.it  In this case I should enable 'myserver2.it' as granted domain.
  in the rule 'Access-Control-Allow-Origin'.  If I use '*', I enable any domain.
*/
app.use(function(req, res, next){

  res.setHeader('Access-Control-Allow-Origin', '*');                                            //granted domains
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //granted headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');             //granted http verbs
  next();
});


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
logger.info('server avviato su localhost:' + port);
logger.debug('ambiente di log settato a debug');