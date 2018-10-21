const crypto = require("./crypto.js");
const generate = require("./generate.js");

crypto.encrypt("Hello world", "../key/public.pem");
// crypto.generate_key();