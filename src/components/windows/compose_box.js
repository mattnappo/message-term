const blessed = require("blessed")
var compose_window = require("./compose_window").compose_window
var settings = require("../globals").settings

var compose_box = blessed.textbox({
    parent: compose_window,
    readOnFocus: true,
    mouse: true,
    keys: true,
    style: {
        // bg: settings.background
        bg: "red"
    },
    height: 2,
    width: compose_window.width,
    left: 1,
    top: 0,
    name: "compose_box"
})

compose_box.on("focus", function() {
    compose_box.readInput()
})

compose_box.key("enter", function() {
    compose_window.submit()
})

module.exports.compose_box = compose_box