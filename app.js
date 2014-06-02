var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());//[add]
app.use(express.cookieParser(process.env.COOKIE_SECRET));//[add]
app.use(express.session());//[add]
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(app.router);
//-------------------fb login test------------------
// https://github.com/jaredhanson/passport#middleware
require('./routes/passport'); // require Passport configuration
require('./models/user');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User'); 

app.use(passport.initialize());
app.use(passport.session());
// Session based flash messages
app.use(flash());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/login', function(req, res,next){
    passport.authenticate('facebook')(req, res, next);
});

app.get('/fbcb', passport.authenticate('facebook', {
    successRedirect:'/mylist',
    failureRedirect: '/food'
}));

app.get('/mylist' ,function(req,res){
    var fbid = req.user && req.user.id; // Get user from req.user
    req.logout(); // Delete req.user
    // Redirect the malicious (not logged in) requests.
    //
    if(fbid === undefined ){
    	//not login
        req.flash('info', "請先登入FaceBook。");
        return res.redirect('/');
    }
    else{//login succeed!!
    	/*need to query db to find 
    	whether fbid has already exit*/
    	var user = new User({fbid: fbid});
    	user.save(function(err, newUser){
	    	if( err ){
	    		//if exist ,call  routes.mylist
	    		routes.mylist();
	    	}
	    	else{
	    		//if not ,save it in db and then call routes.mylist
	    		routes.mylist();
	    	}
		}
    	//ps: routes.mylist should 對 User 的清單做載入
    	
    }
});


//------------------------------------

app.get('/', routes.index);
app.get('/food', routes.food);
//app.get('/mylist', routes.mylist);
app.get('/events', routes.events);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

