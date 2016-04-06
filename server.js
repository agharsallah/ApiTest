// BASic SETUP

var express    = require('express');		
var app        = express(); 				
var bodyParser = require('body-parser'); 	
var morgan     = require('morgan'); 		
var User       = require('./app/models/user');
var port       = process.env.PORT || 8080;

// APP CONFIGURATION ---------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev'));


// ROUTES FOR OUR API
// ======================================

app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});


var apiRouter = express.Router();

// middleware to use for all requests
apiRouter.use(function(req, res, next) {
	
	console.log('change!');

	next(); 
});


apiRouter.get('/', function(req, res) {
	res.json({ message: 'welcome to our api!' });	
});

// ----------------------------------------------------
apiRouter.route('/travel')

	// get all the users (accessed at GET http://localhost:8080/api/travel)
	.get(function(req, res) {
		
		res.json('test');

	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', apiRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);