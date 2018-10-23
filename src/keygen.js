const crypto = require("./crypto.js");
const m_path = require("path");

var path = m_path.resolve(__dirname, "..", "key", "public.pem");
console.log(path)

// var fs = require('fs');
// var dir = './tmp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }