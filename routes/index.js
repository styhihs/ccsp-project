/* GET home page. */
var fs = require('fs');
// Retrieve
var MongoClient = require('mongodb').MongoClient;
var mongoUri = process.env.MONGOLAB_URI || 
			   process.env.MONGOHQ_URL || 
			   "mongodb://localhost:27017";



function initDB(){

	// Connect to the db
	MongoClient.connect(mongoUri, function(err, db) {
	  if(err) { return console.dir(err); }

	  var collection_ptt_food = db.collection('ptt_food');
	  var collection_ptt_otherFood = db.collection('ptt_otherFood');
	  var collection_food_ad = db.collection('food_ad');
	  var collection_foodData = db.collection('foodData');

	  collection_ptt_food.count(function (err, count) {
	    if (!err && count === 0) {
			var ptt_food = JSON.parse(fs.readFileSync(__dirname + "/../data/ptt_food.json", "utf8"));
	    	collection_ptt_food.insert(ptt_food, {w:1}, function(err, result) {});
	    }
	  });
	  collection_ptt_otherFood.count(function (err, count) {
	    if (!err && count === 0) {
			var ptt_otherFood = JSON.parse(fs.readFileSync(__dirname + "/../data/ptt_otherFood.json", "utf8"));
	    	collection_ptt_otherFood.insert(ptt_otherFood, {w:1}, function(err, result) {});
	    }
	  });
	  collection_food_ad.count(function (err, count) {
	    if (!err && count === 0) {
	  		var food_ad = JSON.parse(fs.readFileSync(__dirname + "/../data/food_ad.json", "utf8"));
	    	collection_food_ad.insert(food_ad, {w:1}, function(err, result) {});
	    }
	  });
	  collection_foodData.count(function (err, count) {
	    if (!err && count === 0) {
		  	var foodData = JSON.parse(fs.readFileSync(__dirname + "/../data/data/foodData.json", "utf8"));
	    	collection_foodData.insert(foodData, {w:1}, function(err, result) {});
	    }
	  });
	});
}

exports.index = function(req, res) {
	initDB();
	res.render('index', { title: '首頁' });
};

//GET event timeline page. 
exports.events = function(req, res) {
	MongoClient.connect(mongoUri, function(err, db) {
		if (err) { throw err; }
	  	var collection_foodData = db.collection('foodData');
	  	collection_foodData.find().sort({"date":1}).toArray(function(err, events) {
			res.render('events', {
				title: '食安事件簿',
				events: events
			});
	  	});
	});
};

/* GET food page. */
exports.food = function(req, res) {
	MongoClient.connect(mongoUri, function(err, db) {
	  if(err) { return console.dir(err);}

	  var collection_food_ad = db.collection('food_ad');
	  collection_food_ad.find().sort({"date":-1}).limit(40).toArray(function(err, items) {
		  res.render('food', { title: '違規食品', items: items, hasList: false });
	  });
	});
};

exports.mylist = function(req, res){

	var user = "michael";
	// Connect to the db
	MongoClient.connect(mongoUri, function(err, db) {
	  if(err) { return console.dir(err);}
	  res.render('food', { title: '糾察隊' , items:{}, hasList: true});
	});


};


// exports.login = function(req, res) {
// 	res.render('login', { title: '登入' });
// }
