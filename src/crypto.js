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

var encrypt_k = function(toEncrypt, key) {
    var buffer = new Buffer(toEncrypt);
    var encrypted = crypto.publicEncrypt(key, buffer);
    return encrypted.toString("base64");
};

// var raw_thing = "-----BEGIN RSA PUBLIC KEY-----\n\
// MIIBCgKCAQEAit58str/DeQfeCK3LAPUzOcXGKOVcKyzm/fMjMkUuVq8Nik/Fp/CvsKF0JSP\n\
// QzQyDoKnu867xqNb9tgp17LiaEiL9HSYg4YuwV/xhLtJ25Ebwahz5Icyzz2idupNxmOLf0bT\n\
// /5AGqb4SnLEyevgwr8rY+IHqWxwr5Zhem1+3FqpA0hINQc6HSPNNs8GpjCFHxCwJKkiZnVnt\n\
// NRMCcfx8dO/RO3DQYhivFtRBCnKxJ3n0rvssSNvzCvsD/8MSMXZrVuC03YXDxQI3XKf0iqHz\n\
// qPaa27Xq5S2045I1HnSeN56SCwNxqI8lmlDsKQXjuYiSjkuJAZfMHkt6pL5tYZqGHQIDAQAB\n\
// -----END RSA PUBLIC KEY-----";
// console.log(encrypt_k("bob", raw_thing));

var decrypt = function(toDecrypt, absolutePath) {
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

var decrypt_k = function(toDecrypt, key) {
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(key, buffer);
    return decrypted.toString("utf8");
};

var generate = function(dir) {
    var pair = keypair();
    var priv = path.resolve(dir, "private.pem");
    var pub = path.resolve(dir, "public.pem");

    fs.writeFile(priv, pair["private"], function(err) {
        if(err) return console.log(err);
    });
    fs.writeFile(pub, pair["public"], function(err) {
        if(err) return console.log(err);
    });
    return true;
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    generate: generate
}