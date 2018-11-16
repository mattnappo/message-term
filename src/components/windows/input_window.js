const blessed = require("blessed")
var screen = require("./screen").screen
var settings = require("../globals").settings

var input_window = blessed.form({
    parent: screen,
    mouse: true,
    keys: true,
    vi: true,
    top: screen.height - 4,
    left: "50%",
    width: "50%",
    style: {
        bg: "green",
        scrollbar: {
            inverse: true
        }
    },
    // label: "{" + settings.foreground + "-fg}{bold}Message{/bold}{/" + settings.foreground + "-fg}",
    label: "Message",
    border: {
        type: "line"
    },
    style: {
        border: {
            fg: settings.foreground
        },
        fg: settings.foreground,
        bg: settings.background
    },
    scrollable: true,
    scrollbar: {
        ch: " "
    },
})

module.exports.input_window = input_window