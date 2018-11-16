const blessed = require("blessed")
var screen = require("./screen").screen
var settings = require("../globals").settings

var compose_window = blessed.form({
    parent: screen,
    mouse: true,
    keys: true,
    vi: true,
    top: screen.height - 4,
    left: 0,
    width: "50%",
    style: {
        bg: "green",
        scrollbar: {
            inverse: true
        }
    },
    // label: "{" + settings.foreground + "-fg}{bold}Message{/bold}{/" + settings.foreground + "-fg}",
    label: "Compose",
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

module.exports.compose_window = compose_window