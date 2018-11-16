const blessed = require("blessed")
var screen = require("./screen")
var settings = require("../globals").settings

var header = blessed.box({
    parent: screen,
    top: 0,
    height: 3,
    width: "100%",
    content: "{center}{bold}Message Term{/bold}{/center}",
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
})

module.exports.header = header