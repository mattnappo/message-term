const blessed = require("blessed")
var screen = require("./screen").screen
var settings = require("../globals").settings

var people_window = blessed.list({
    parent: screen,
    top: 3,
    width: "50%",
    height: screen.height - 7,
    label: "{" + settings.foreground + "-fg}{bold}People{/bold}",
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

module.exports.people_window = people_window
module.exports.thing = "thing"