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

function newkey() {
    var name = random_hash();
    var this_key = path.resolve(__dirname, "..", "keys", name);
    create_dir(this_key);
    crypto.generate(this_key);
}

function main() {
    var root = path.resolve(__dirname, "..", "keys");
    create_dir(root);
}

// ----- INIT CODE -----
const blessed = require("blessed");
const crypto = require("./crypto.js");

const fs = require("fs");
const path = require("path");

var settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
};

// ----- SETUP -----

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});

function init_scr() {
    var screen = blessed.screen({
        smartCSR: true,
        debug: true,
        title: "Message Term"
    });
    
    screen.key(["C-x"], function(ch, key) { 
        return process.exit(0);
    });

    var header = blessed.box({
        parent: screen,
        top: 0,
        height: 3,
        width: "100%",
        content: "{center}{bold}Message Term Keygen{/bold}{/center}",
        tags: true,
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: settings.foreground
            },
            fg: settings.foreground,
            bg: settings.background
        }
    });

    var main_box = blessed.box({
        parent: screen,
        top: "50%",
        width: "50%",
        height: "50%",
        tags: true,
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: settings.foreground
            },
            fg: settings.foreground,
            bg: settings.background
        }
    });
    
}

// ----- UI -----

    
// person_box.on("click", function(data) {
//     if (!clicked_chat) hide_element(no_chats);
//     current_chat = person;
//     update_messages();
// });

// main();
init_scr();