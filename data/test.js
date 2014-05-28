var fs = require('fs');
var buf = fs.readFileSync("ptt_otherFood.json", "utf8");
buf = JSON.parse(buf);
console.log(buf[0].title);
console.log(buf[0].content.replace(/發信站\:批踢踢實業坊\(ptt\.cc\).*/g, ""));