/* GET home page. */
var fs = require('fs');
var wikiEventsFilePath = __dirname + '/../data/foodData.json'

function initDB(){
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;
	var mongoUri = process.env.MONGOLAB_URI || 
				   process.env.MONGOHQ_URL || 
				   "mongodb://localhost:27017/foods";

	// Connect to the db
	MongoClient.connect(mongoUri, function(err, db) {
	  if(err) { return console.dir(err); }

	  var ptt_food = JSON.parse(fs.readFileSync("data/ptt_food.json", "utf8"));
	  var ptt_otherFood = JSON.parse(fs.readFileSync("data/ptt_otherFood.json", "utf8"));
	  var food_ad = JSON.parse(fs.readFileSync("data/food_ad.json", "utf8"));
	  var foodData = fs.readFileSync("data/foodData.json", "utf8");

	  var collection_ptt_food = db.collection('ptt_food');
	  var collection_ptt_otherFood = db.collection('ptt_otherFood');
	  var collection_food_ad = db.collection('food_ad');
	  var collection_foodData = db.collection('foodData');

	  // var stream = collection_ptt_food.find({mykey:{$ne:2}}).stream();
	  // stream.on("data", function(item) {
	  // 	if (item) console.log(item);
	  // 	else console.log("no item");
	  // });
	  // stream.on("end", function() {
	  // 	console.log('done insert');
	  // });
	});
}

exports.index = function(req, res) {
	initDB();
	res.render('index', { title: '首頁' });
};

/* GET event timeline page. */
exports.events = function(req, res) {
	fs.readFile(wikiEventsFilePath, 'utf8', function (err, data) {
		if (err) { throw err; }

		data = data.trim();
		data = JSON.parse(data);
		
		res.render('events', {
			title: '食安事件簿',
			events: data
		});
	});
};

/* GET food page. */
exports.food = function(req, res) {
	res.render('food', { title: '食品糾察隊' });
};

exports.login = function(req, res) {
	res.render('login', { title: '登入' });
}