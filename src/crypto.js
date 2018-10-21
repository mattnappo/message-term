const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

var encrypt = function(toEncrypt, path) {
    var absolutePath = path.resolve(path);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decrypt = function(toDecrypt, path) {
    var absolutePath = path.resolve(path);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};
   
module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}