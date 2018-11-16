const blessed = require("blessed")
var screen = require("./screen").screen
var settings = require("../globals").settings

var chat_window = blessed.box({
    parent: screen,
    top: 3,
    left: "50%",
    width: "50%",
    height: screen.height - 7,
    label: "{" + settings.foreground + "-fg}{bold}Conversations{/bold}",
    tags: true,
    border: {
        type: "line"
    },
    mouse: true,
    scrollable: true,
    alwaysScroll: true,
    scrollback: 100,
    scrollbar: {
        ch: " ",
        track: {
            bg: settings.background
        },
        style: {
            inverse: true
        }
    },
    style: {
        border: {
            fg: settings.foreground
        },
        fg: settings.foreground,
        bg: settings.background
    }
})

module.exports.chat_window = chat_window