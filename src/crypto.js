const keypair = require('keypair');
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

var encrypt = function(toEncrypt, absolutePath) {
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decrypt = function(toDecrypt, absolutePath) {
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

function generate() {
    var pair = keypair();
    fs.writeFile("./key/private.pem", pair["private"], function(err) {
        if(err) return console.log(err);
    });
    fs.writeFile("./key/public.pem", pair["public"], function(err) {
        if(err) return console.log(err);
    });
    console.log("RSA keypair exported.");
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    generate: generate
}