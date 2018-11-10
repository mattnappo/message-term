var { common } = require("common.js");

var screen = blessed.screen({
    smartCSR: true,
    debug: true,
    title: "Message Term",
    style: {
        bg: settings.background
    }
});

screen.key(["C-x"], function(ch, key) {
    return process.exit(0);
});

module.exports.screen = screen;