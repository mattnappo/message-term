// ----- INIT CODE -----

const blessed = require("blessed");
const crypto = require("./crypto.js");
const r_crypto = require("crypto");

const fs = require("fs");
const path = require("path");

var settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
};

var screen;
var new_key_btn;
var remove_key_btn;
var set_main_key_btn;
var new_key_count = 0;

// ----- CRYPTO STUFF -----

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
    if (crypto.generate(this_key)) {
        new_key_btn.setContent("{center}{bold}Keypair '" + name + "' generated.{/bold}{/center}");
    } else {
        new_key_btn.setContent("Keygen failed.");
    }
    screen.render();
    return name;
}

function set_main_key(keyid) {
    var m_key = path.resolve(__dirname, "..", "keys", keyid);
    var keysjson = path.resolve(__dirname, "..", "keys", "keys.json");
    if (fs.existsSync(m_key)) {
        var mainkey = {
            mainkey: keyid
        };
        fs.writeFile(keysjson, JSON.stringify(mainkey), function(err) {
            if(err) return console.log(err);
        });
        return true;
    } else {
        return true;
    }
}

function main() {
    var root = path.resolve(__dirname, "..", "keys");
    create_dir(root);
}

// ----- GUI -----

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});

function create_footer(name) {
    return {
        parent: screen,
        top: screen.height - 3,
        height: 3,
        width: "100%",
        content: "{center}{bold}Main key: " + name + "{/bold}{/center}",
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
    };
}

function init_scr() {
    screen = blessed.screen({
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
        content: "{center}{bold}Key Manager{/bold}{/center}",
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
    
    var footer;

    var p = path.join(__dirname, "..", "keys", "keys.json");
    try {
        var raw = fs.readFileSync(p, "utf8");
        var contents = JSON.parse(raw);
        footer = blessed.box(create_footer(contents["mainkey"]));
    } catch (err) {
        footer = blessed.box(create_footer("None"));
    }
    screen.render();

    var main_box = blessed.box({
        parent: screen,
        top: "25%",
        left: "25%",
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
    
    new_key_btn = blessed.button({
        parent: main_box,
        top: "33%",
        width: "50%",
        left: "25%",
        content: "{center}{bold}Generate a new key{/bold}{/center}",
        height: 3,
        tags: true,
        style: {
            fg: settings.foreground,
            bg: settings.background
        }
    });

    new_key_btn.on("click", function(data) {
        if (new_key_count == 0) {
            var keyid = newkey();
            set_main_key(keyid);
            new_key_count += 1;
        }
    });
}

// ----- MAIN -----

main();
init_scr();

screen.render();