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
    encrypt_k: encrypt_k,
    decrypt_k: decrypt_k,
    generate: generate
}



var raw_r = '{"public_key":"-----BEGIN RSA PUBLIC KEY-----\\nMIIBCgKCAQEAit58str/DeQfeCK3LAPUzOcXGKOVcKyzm/fMjMkUuVq8Nik/Fp/CvsKF0JSP\\nQzQyDoKnu867xqNb9tgp17LiaEiL9HSYg4YuwV/xhLtJ25Ebwahz5Icyzz2idupNxmOLf0bT\\n/5AGqb4SnLEyevgwr8rY+IHqWxwr5Zhem1+3FqpA0hINQc6HSPNNs8GpjCFHxCwJKkiZnVnt\\nNRMCcfx8dO/RO3DQYhivFtRBCnKxJ3n0rvssSNvzCvsD/8MSMXZrVuC03YXDxQI3XKf0iqHz\\nqPaa27Xq5S2045I1HnSeN56SCwNxqI8lmlDsKQXjuYiSjkuJAZfMHkt6pL5tYZqGHQIDAQAB\\n-----END RSA PUBLIC KEY-----","body":"Y98WFMA/7AOnNDvQlH371MImA+ScHNkiVFyuAoExKeHjThVFei/vZx0jiBV7nLj4Nzf13HPfjc47zVjy/guqccY7VbHjibTWXA42ps+RxL69UfS9SXf8gF+7oU+AUtFzyEO8eeirPtisVwgKp5MFiy/1XkopRQQ9xlkNuMD76cV8f/dzqoLx2HhvvIjjFM9YJ2RebB01yvl3TE8m2eGxjfFuN1zwqImpOlT8DqG5nTR7f6yi0+JlQjA8dYQh/Do01T6X0j1TrA1L9SxXDFF/G2rWSYzlCanTCN+6Vw5ZxQt3C1FlviywPXQWg+bn1jjhiT/6qWALVQxx1KPivIo/JA=="}';
// var s = raw_r.replace(/\n/g, String.raw`\\n`);
// console.log(raw_r + "\n\n\n");

var t = JSON.parse(raw_r);

console.log("body: ", t["body"]);
console.log(" key:", t["public_key"]);

// var f = t["public_key"].replace(/\\n/g, String.raw`\n`);

// console.log(f);
var ss = encrypt_k("squidward", t["public_key"]);
console.log(ss);
// 
// var decrypted = decrypt_k(t["body"]);
// console.log(ss);
// 
