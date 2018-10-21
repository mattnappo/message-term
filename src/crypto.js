const readline = require("readline");
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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var passphrase;

rl.question("Enter an RSA passphrase: ", (input) => {
    passphrase = input;
    rl.close();
});

const { generateKeyPair } = require("crypto");
generateKeyPair("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: "spki",
        format: "pem"
    },
    privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: passphrase
    }
}, (err, publicKey, privateKey) => {
    fs.writeFile("./key/private.pem", privateKey, function(err) {
        if(err) return console.log(err);
        console.log("Private key exported.");
    });
    fs.writeFile("./key/public.pem", publicKey, function(err) {
        if(err) return console.log(err);
        console.log("Private key exported.");
    });
});

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}