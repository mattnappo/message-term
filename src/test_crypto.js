const crypto = require("./crypto.js");
const generate = require("./generate.js");
const m_path = require("path");


var path = m_path.resolve(__dirname, "..", "key/public.pem");
var s = crypto.encrypt("Hello world", path);
console.log(s);

// generate.generate();