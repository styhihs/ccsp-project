var fs = require('fs');
var data = fs.readFileSync('ptt_otherFood.json', 'utf8');
var x = [];
x.push(data);
var	appledaily = JSON.stringify(x, null, "\t");
console.log(appledaily);

// fs.writeFileSync('formated.json', appledaily);