const r_crypto = require("crypto");
const crypto = require("./crypto.js");
const path = require("path");
const fs = require("fs");

function random_hash() {
    var md5 = r_crypto.createHash("md5");
    var raw = Math.random().toString() + Math.random().toString() + (new Date).getTime().toString();
    var raw_hash = md5.update(raw);
    var digested_hash = raw_hash.digest("hex");
    return digested_hash.substring(0, 8);
}

function create_dir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

function main() {
    var root = path.resolve(__dirname, "..", "keys");
    create_dir(root);
    
    var name = random_hash();
    var this_key = path.resolve(__dirname, "..", "keys", name);
    create_dir(this_key);

}

main();