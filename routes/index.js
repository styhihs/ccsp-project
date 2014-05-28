/* GET home page. */
exports.index = function(req, res) {
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