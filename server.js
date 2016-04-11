var express    = require('express');		
var app        = express(); 				
var bodyParser = require('body-parser'); 	
var morgan     = require('morgan'); 		
var config = require('./config.js');
var port       = process.env.PORT || 3000;
var request = require('request');
var util = require('util');
var expressValidator = require('express-validator');



// APP CONFIGURATION ---------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator({customValidators:{
	sup:function(num) {
        return parseInt(num)>0;
    },
    supeq:function(num) {
        return parseInt(num)>=0;
    }

}}));


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
	
	req.checkQuery('start_date', 'Invalid start_date getparam').notEmpty().isISO8601();
	req.checkQuery('return_date', 'Invalid return_date getparam').notEmpty().isISO8601();	
	req.checkQuery('adult_passengers', 'Invalid adult_passengers getparam').notEmpty().isInt().sup();	
	req.checkQuery('max_stops', 'Invalid max_stops getparam').notEmpty().isInt().supeq();	
	req.checkQuery('max_price', 'Invalid max_price getparam').notEmpty().isInt().sup();	
	req.checkQuery('max_price_currency', 'nvalid max_price_currency getparam').notEmpty();

	var errors = req.validationErrors();
	  if (errors) {
	     res.status(400).send('There have been validation errors: ' + util.inspect(errors))
    return;
	  }

		
// -------------Create JSON Object-----------------------------------
		
		var test = {},		
		query = req.query,
		start_date = query.start_date,
		adult_passengers = query.adult_passengers,
		origin = query .origin,
		destination = query.destination,
		max_stops = query.max_stops,
		max_price = query.max_price,
		max_price_currency =query.max_price_currency;
		//console.log(start_date);

		var slice = [];
		var requeste = {};

		test.request = requeste ;
		test.request.slice = slice;
		var slice_obj = {
							"origin" : origin
							, "destination" : destination
							, "date" : start_date
							, "maxStops" : max_stops
		};
		test.request.slice.push(slice_obj);
		var passengers = {"adultCount":adult_passengers}; 
		test.request.passengers = passengers;
		test.request.solutions = 20;
		test.request.maxPrice = max_price_currency + max_price
		JSON.stringify(test);
		console.log("--------------------------------------",test);
		// console.log("---------------------req.query",req.query)

// -------------Create JSON Object-----------------------------------

// -------------POST Request to QPX API-----------------------------------
	

	request.post("https://www.googleapis.com/qpxExpress/v1/trips/search?key="+config.qpx.key, {
  body : test,
  json: true
}, function (err, body) {
  if (err) {console.log(err)
  }else {
	res.json(body);
  }
});


	});
// -------------POST Request to QPX API-----------------------------------



// REGISTER OUR ROUTES -------------------------------
app.use('/api', apiRouter);


	

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('localhost:' + port);