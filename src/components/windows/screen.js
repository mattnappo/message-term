const blessed = require("blessed")
var globals = require("../globals")

var screen = blessed.screen({
    smartCSR: true,
    debug: true,
    title: "Message Term",
    style: {
        bg: globals.settings.background
    }
})

screen.key(["C-x"], function(ch, key) { 
    return process.exit(0)
})

module.exports.screen = screen
module.exports.test = function() {
    console.log("💛 💙 💜 ❤️ 💚 💛 💙 💜 ❤️ 💚")
}