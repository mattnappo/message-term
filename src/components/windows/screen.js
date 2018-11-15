var { settings, blessed }  = require("../globals");

module.exports.screen = blessed.screen({
    smartCSR: true,
    debug: true,
    title: "Message Term",
    style: {
        bg: settings.background
    }
});

module.exports.screen.key(["C-x"], function(ch, key) {
    return process.exit(0);
});

module.exports.inner = function() {
    console.log("Linked inner!");
};