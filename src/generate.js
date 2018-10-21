const keypair = require('keypair');
const fs = require("fs");

module.exports = {
    generate: function() {
        var pair = keypair();

        fs.writeFile("./key/private.pem", pair["private"], function(err) {
            if(err) return console.log(err);
            console.log("Private key exported.");
        });
        fs.writeFile("./key/public.pem", pair["public"], function(err) {
            if(err) return console.log(err);
            console.log("Private key exported.");
        });
    }
}