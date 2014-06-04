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
	  var collection_users   = db.collection('users');
	  
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
		  	var foodData = JSON.parse(fs.readFileSync(__dirname + "/../data/foodData.json", "utf8"));
	    	collection_foodData.insert(foodData, {w:1}, function(err, result) {});
	    }
	  });

	  collection_users.count(function (err, count) {
        if (!err && count === 0) {
            var user = JSON.parse(fs.readFileSync(__dirname + "/../data/users.json", "utf8"));
            collection_users.insert(user, {w:1}, function(err, result) {});
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

	  var pages = req.query.pages;
	  collection_food_ad.find().sort({"date":-1}).skip((pages)*40).limit(40).toArray(function(err, items) {
  		  console.log(req.query.search);
		  res.render('food', { title: '違規食品', items: items, hasList: false , search:"testing", page:pages});
	  });
	});
}

exports.search = function(req, res) {
	var keyword = req.query.keyword;
	var re = new RegExp(keyword,"g");
	// var str = "mystring".replace(re, "dick");
	// console.log(str);

	MongoClient.connect(mongoUri, function(err, db) {
	  if(err) { return console.dir(err);}

	  var collection_food_ad = db.collection('food_ad');
	  collection_food_ad.find({'food':re}).sort({"date":-1}).limit(20).toArray(function(err, items) {
  		  // console.log("dicker"+req.query.search);

  	      res.send(items);
	  });
	});
};


exports.mylist = function(req, res){

    var fbid = req.user && req.user.id;
	var data = {
		"fbid": fbid,
		"foodlist":[]
	};
	var list = {

	};
    req.logout(); // Delete req.user
    // console.log("mylist: " + fbid);
    
    MongoClient.connect(mongoUri, function(err, db) {
	  if(err) { return console.dir(err);}

	  var collection_users = db.collection('users');
	  collection_users.findOne({'fbid':fbid}, function(err, item) {
	  	  if (item === null) {
	  	  	console.log('小屌');
	    	// collection_users.insert(ptt_food, {w:1}, function(err, result) {});

	  	  }
	  	  else {
		  	console.log('屁眼'+item);
	  	  }
          res.render('food', { title: '糾察屁眼' , items:{}, hasList: true});
  	      // res.send(items);
	  });
	});
    // MongoClient.connect(mongoUri, function(err, db) {
    //   if(err) {
    //     console.log("err: "+err);
    //     return console.dir(err);
    //   }
    //   var collection_users = db.collection('users');
    //   collection_users.find({"fbid":fbid}).toArray(function(err, items) {
    //   	if(!(items[0])){
    //   		res.render('index', { title: '首頁' });//no user!!
    //   	}
    //   	else{
	   //    	var itemNum = items[0].list.length;
	   //    	var userList = [];
	   //    	for(var i = 0; i<itemNum;i++){
	   //    		var obj = {
	   //    			food    :items[0].list[i].food,
	   //    			location:items[0].list[i].location,
	   //    			brand   :items[0].list[i].brand
	   //    		};
	   //    		userList.push(obj);
	   //    	}
	   //    	console.log(userList);
	   //      res.render('food', { title: '糾察隊' , items:{}, hasList: true});
    //     }
    //     });
    // });
};