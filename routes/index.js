/* GET home page. */
var fs = require('fs');

exports.index = function(req, res) {
	var ptt_food = JSON.parse(fs.readFileSync("data/ptt_food.json", "utf8"));
	var ptt_otherFood = JSON.parse(fs.readFileSync("data/ptt_otherFood.json", "utf8"));

	// Retrieve
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/foods", function(err, db) {
	  if(err) { return console.dir(err); }

	  // console.log("new");
	  var collection1 = db.collection('ptt_food');
	  var collection2 = db.collection('ptt_otherFood');

	  //init
	  // if ()
	 //  for (var i = 0; i < ptt_food.length; i++) {
		// collection1.insert(ptt_food[i], {w:1}, function(err, result) {});
	 //  }
	  // for (var i = 0; i < ptt_otherFood.length; i++) {
		 //  collection2.insert(ptt_otherFood[i], {w:1}, function(err, result) {});
	  // }

	});
	res.render('index', { title: '首頁' });
};

/* GET event timeline page. */
exports.events = function(req, res) {
	res.render('events', { title: '食安事件簿' });
};

/* GET food page. */
exports.food = function(req, res) {
	res.render('food', { title: '食品糾察隊' });
};

exports.login = function(req, res) {
	res.render('login', { title: '登入' });
}